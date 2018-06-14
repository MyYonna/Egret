var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.gameData = []; //排行榜数据
        wx.onMessage(function (data) {
            var that = _this;
            if (data.isDisplay) {
                _this.openid = data.openid;
                wx.getFriendCloudStorage({
                    keyList: ["rank_socre"],
                    success: function (res) {
                        console.log(res.data);
                        _this.gameData = []; //需要清空数据才行，暂时不做
                        res.data.forEach(function (friendInfo, index) {
                            friendInfo.KVDataList.forEach(function (item, index) {
                                var value = JSON.parse(item.value);
                                _this.gameData.push(new RankInfo(friendInfo.nickname, friendInfo.avatarUrl, friendInfo.openid, value.cost_step));
                            });
                        });
                        _this.runGame();
                    },
                    fail: function (err) {
                    },
                    complete: function () {
                    }
                });
                //监听消息 isDisplay
            }
            else {
                _this.cancelGame();
            }
            if (data.update_step) {
                var station = {
                    "cost_step": data.cost_step
                };
                console.log(JSON.stringify(station) + 0);
                wx.getUserCloudStorage({ keyList: ["rank_socre"], success: function (res) {
                        console.log(res);
                        console.log(res.KVDataList);
                        var kvDataList = res.KVDataList;
                        if (kvDataList == null) {
                            console.log(JSON.stringify(station) + 1);
                            wx.setUserCloudStorage({
                                KVDataList: [{ key: "rank_socre", value: JSON.stringify(station) }], success: function (res) {
                                }, fail: function (err) {
                                }, complete: function () {
                                }
                            });
                        }
                        kvDataList.forEach(function (item, index) {
                            var value = item.value;
                            var cost_step = JSON.parse(value).cost_step;
                            if (cost_step <= data.cost_step) {
                                return;
                            }
                            else {
                                console.log(JSON.stringify(station) + 2);
                                wx.setUserCloudStorage({
                                    KVDataList: [{ key: "rank_socre", value: JSON.stringify(station) }], success: function (res) {
                                    }, fail: function (err) {
                                    }, complete: function () {
                                    }
                                });
                            }
                        });
                    }, fail: function (res) { }, complete: function (res) { } });
            }
        });
        //测试点击
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            console.log('子域输出点击');
        }, _this);
        return _this;
    }
    Main.prototype.runGame = function () {
        var _this = this;
        //排行榜标题
        var title = new RankTitle();
        this.addChild(title);
        title.render();
        //绘制排行榜
        var rank = new Rank();
        this.addChild(rank);
        rank.render();
        //绘制排行榜的头部
        var item = new RankHead();
        rank.setHeader(item);
        item.render();
        //内容区域
        var rankContent = new RankContent();
        var listContainer = rankContent.listContainer;
        rank.setContent(rankContent);
        rankContent.render();
        //填充内容区域的条目
        if (this.gameData.length == 0) {
            return;
        }
        this.gameData.forEach(function (value, index) {
            var item = new RankItem(index, value, false);
            item.y = index * 100;
            item.height = 100;
            item.width = rank.width;
            item.render();
            listContainer.addChild(item);
            if (value.openid == _this.openid) {
                //展示自己的排名
                var self_item1 = new RankItem(index, value, true);
                self_item1.height = 100;
                self_item1.width = rank.width;
                self_item1.anchorOffsetX = self_item1.width / 2;
                self_item1.x = _this.stage.stageWidth / 2;
                self_item1.y = rank.y + rank.height / 2 + 20;
                _this.addChild(self_item1);
                self_item1.render();
            }
        }, this);
    };
    //删除离屏的内容
    Main.prototype.cancelGame = function () {
        for (var i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
