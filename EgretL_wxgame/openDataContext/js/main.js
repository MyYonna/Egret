var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
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
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        return _super.call(this) || this;
    }
    Rank.prototype.setHeader = function (header) {
        this.addChild(header);
    };
    Rank.prototype.setContent = function (content) {
        this.addChild(content);
    };
    Rank.prototype.render = function () {
        this.width = this.stage.stageWidth * 0.8;
        this.height = this.stage.stageHeight * 0.6;
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.x = this.stage.stageWidth >> 1;
        this.y = (this.stage.stageHeight >> 1) - 50;
        //为滚动视图添加背景色
        this.background = new egret.Shape();
        this.background.graphics.beginFill(0x363636, 1);
        this.background.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        this.background.graphics.endFill();
        this.addChild(this.background);
    };
    return Rank;
}(egret.DisplayObjectContainer));
__reflect(Rank.prototype, "Rank");
var RankContent = (function (_super) {
    __extends(RankContent, _super);
    function RankContent() {
        var _this = _super.call(this) || this;
        _this.listContainer = new egret.DisplayObjectContainer();
        return _this;
    }
    RankContent.prototype.render = function () {
        //设置滚动视图的内容区域以及其定位和高宽
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height - 60;
        this.y = this.parent.getChildAt(1).height;
    };
    ;
    return RankContent;
}(egret.ScrollView));
__reflect(RankContent.prototype, "RankContent");
var RankHead = (function (_super) {
    __extends(RankHead, _super);
    function RankHead() {
        return _super.call(this) || this;
    }
    RankHead.prototype.render = function () {
        this.height = 60;
        this.width = this.parent.width;
        var bg_shape = new egret.Shape();
        bg_shape.graphics.beginFill(0x363636, 1);
        bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        var l_title = new egret.TextField();
        l_title.x = 20;
        l_title.height = 60;
        l_title.text = "每周一凌晨刷新";
        l_title.textColor = 0x929292;
        l_title.size = 20;
        l_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(l_title);
    };
    return RankHead;
}(egret.DisplayObjectContainer));
__reflect(RankHead.prototype, "RankHead");
var RankInfo = (function () {
    function RankInfo(nickname, avatarUrl, openid, score) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.score = score;
    }
    return RankInfo;
}());
__reflect(RankInfo.prototype, "RankInfo");
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem(index, value, single) {
        var _this = _super.call(this) || this;
        _this.single = false;
        _this.index = 0;
        _this.single = single;
        _this.index = index;
        _this.value = value;
        return _this;
    }
    RankItem.prototype.render = function () {
        var _this = this;
        //条目背景
        var bg_shape = new egret.Shape();
        bg_shape.graphics.beginFill(this.index % 2 == 0 ? 0x363636 : 0x404040, 1);
        if (this.single) {
            bg_shape.graphics.lineStyle(1, 0x797b7e);
            bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        }
        else {
            bg_shape.graphics.drawRect(0, 0, this.width, this.height);
        }
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        //排行
        var rank = new egret.TextField();
        rank.x = 20;
        rank.height = 100;
        rank.text = this.index + 1 + "";
        rank.textColor = this.index == 0 ? 0xff7100 : this.index == 1 || this.index == 2 ? 0xffc113 : 0xa9a9a9;
        rank.size = 25;
        rank.bold = true;
        rank.italic = true;
        rank.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(rank);
        //图片
        var imageLoader = new egret.ImageLoader();
        var bgtexture = new egret.Texture();
        imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            bgtexture._setBitmapData(imageLoader.data);
            var bitmap = new egret.Bitmap(bgtexture);
            bitmap.width = 50;
            bitmap.height = 50;
            bitmap.x = 70;
            bitmap.anchorOffsetY = bitmap.height >> 1;
            bitmap.y = 50;
            _this.addChild(bitmap);
        }, this);
        imageLoader.load(this.value.avatarUrl);
        //昵称
        var nicktxt = new egret.TextField();
        nicktxt.x = 150;
        nicktxt.height = 100;
        nicktxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        nicktxt.text = this.value.nickname;
        nicktxt.size = 20;
        this.addChild(nicktxt);
        //分数
        var numtxt = new egret.TextField();
        numtxt.x = this.width - 80;
        numtxt.height = 100;
        numtxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        numtxt.textAlign = egret.HorizontalAlign.RIGHT;
        numtxt.text = this.value.score + "";
        numtxt.size = 26;
        this.addChild(numtxt);
    };
    return RankItem;
}(egret.DisplayObjectContainer));
__reflect(RankItem.prototype, "RankItem");
var RankTitle = (function (_super) {
    __extends(RankTitle, _super);
    function RankTitle() {
        return _super.call(this) || this;
    }
    RankTitle.prototype.render = function () {
        this.text = "好友排行榜";
        this.size = 40;
        this.width = this.stage.stageWidth;
        this.y = 50;
        this.textAlign = egret.HorizontalAlign.CENTER;
        this.textColor = 0xffffff;
    };
    return RankTitle;
}(egret.TextField));
__reflect(RankTitle.prototype, "RankTitle");
;window.Main = Main;