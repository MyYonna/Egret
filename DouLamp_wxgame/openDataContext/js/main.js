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
            console.log(data);
            if (data.isDisplay) {
                _this.openid = data.openid;
                wx.getFriendCloudStorage({
                    keyList: ["dou_lamp_rank_socre"],
                    success: function (res) {
                        _this.gameData = []; //需要清空数据才行，暂时不做
                        res.data.forEach(function (friendInfo, index) {
                            if (Object.keys(friendInfo.KVDataList).length > 0) {
                                friendInfo.KVDataList.forEach(function (item, index) {
                                    var value = JSON.parse(item.value);
                                    _this.gameData.push(new RankInfo(friendInfo.nickname, friendInfo.avatarUrl, friendInfo.openid, value.score));
                                });
                            }
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
            if (data.update_score) {
                var station = {
                    "score": data.score
                };
                wx.getUserCloudStorage({ keyList: ["dou_lamp_rank_socre"], success: function (res) {
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "dou_lamp_rank_socre", value: JSON.stringify(station) }], success: function (res) {
                                console.log(res);
                            }, fail: function (err) {
                                console.log(err);
                            }, complete: function () {
                            }
                        });
                    }, fail: function (res) { }, complete: function (res) { } });
            }
            if (data.obtain_score) {
                wx.getUserCloudStorage({ keyList: ["dou_lamp_rank_socre"], success: function (res) {
                        var kvDataList = res.KVDataList;
                        console.log(kvDataList);
                        // if(Object.keys(kvDataList).length>0){
                        //     kvDataList.forEach((item,index)=>{
                        //         var value = JSON.parse(item.value);
                        //         wx.getOpenDataContext().postMessage({
                        //             is_self_score:true,
                        //             score:value.score
                        //         })
                        //     })
                        // }
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
        //绘制排行榜
        var rank = new Rank();
        this.addChild(rank);
        var listContainer = rank.rankContent.listContainer;
        //填充内容区域的条目
        if (this.gameData.length == 0) {
            return;
        }
        this.gameData.forEach(function (value, index) {
            var item = new RankItem(index, value, false);
            item.y = index * 30;
            item.height = 30;
            item.width = rank.width;
            listContainer.addChild(item);
            if (value.openid == _this.openid) {
                //展示自己的排名
                var self_item1 = new RankItem(index, value, true);
                self_item1.height = 30;
                self_item1.width = rank.width;
                self_item1.anchorOffsetX = self_item1.width / 2;
                self_item1.x = _this.stage.stageWidth / 2;
                self_item1.y = rank.y + rank.height + 5;
                _this.addChild(self_item1);
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
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    Rank.prototype.render = function () {
        this.width = this.stage.stageWidth * 0.9;
        this.height = this.stage.stageHeight * 0.8;
        this.anchorOffsetX = this.width >> 1;
        this.x = this.stage.stageWidth >> 1;
        this.y = 10;
        //为滚动视图添加背景色
        this.background = new egret.Shape();
        this.background.graphics.beginFill(0x363636, 1);
        this.background.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        this.background.graphics.endFill();
        this.addChild(this.background);
        //绘制排行榜的头部
        this.rankHead = new RankHead();
        this.addChild(this.rankHead);
        //内容区域
        this.rankContent = new RankContent();
        this.addChild(this.rankContent);
    };
    return Rank;
}(egret.DisplayObjectContainer));
__reflect(Rank.prototype, "Rank");
var RankContent = (function (_super) {
    __extends(RankContent, _super);
    function RankContent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RankContent.prototype.render = function () {
        //设置滚动视图的内容区域以及其定位和高宽
        this.listContainer = new egret.DisplayObjectContainer();
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height - 30;
        this.y = this.parent.getChildAt(1).height;
    };
    return RankContent;
}(egret.ScrollView));
__reflect(RankContent.prototype, "RankContent");
var RankHead = (function (_super) {
    __extends(RankHead, _super);
    function RankHead() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RankHead.prototype.render = function () {
        this.height = 30;
        this.width = this.parent.width;
        var bg_shape = new egret.Shape();
        bg_shape.graphics.beginFill(0x363636, 1);
        bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        var l_title = new egret.TextField();
        l_title.x = 20;
        l_title.height = this.height;
        l_title.width = this.width;
        l_title.text = "每周一凌晨刷新";
        l_title.textColor = 0xf0f0f0;
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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
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
        rank.x = 10;
        rank.height = 30;
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
            bitmap.width = rank.height;
            bitmap.height = rank.height;
            bitmap.x = 70;
            bitmap.anchorOffsetY = bitmap.height >> 1;
            bitmap.y = 15;
            _this.addChild(bitmap);
        }, this);
        imageLoader.load(this.value.avatarUrl);
        //昵称
        var nicktxt = new egret.TextField();
        nicktxt.x = 150;
        nicktxt.height = rank.height;
        nicktxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        nicktxt.text = this.value.nickname;
        nicktxt.size = 20;
        this.addChild(nicktxt);
        //分数
        var numtxt = new egret.TextField();
        numtxt.x = this.width - 120;
        numtxt.height = rank.height;
        numtxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        numtxt.textAlign = egret.HorizontalAlign.RIGHT;
        numtxt.text = this.value.score + "";
        numtxt.size = 25;
        this.addChild(numtxt);
    };
    return RankItem;
}(egret.DisplayObjectContainer));
__reflect(RankItem.prototype, "RankItem");
var RankTitle = (function (_super) {
    __extends(RankTitle, _super);
    function RankTitle() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
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