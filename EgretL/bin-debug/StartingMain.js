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
var StartingMain = (function (_super) {
    __extends(StartingMain, _super);
    function StartingMain() {
        var _this = _super.call(this) || this;
        _this.begin_bg = null;
        _this.begin_title = null;
        _this.startBtn = new StartBtn();
        _this.end_bg = null;
        _this.btnRank = new egret.Bitmap(RES.getRes(APP_RANK_VIEW));
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    StartingMain.prototype.render = function () {
        // this.stage.stageWidth = this.stage.stageWidth;
        // this.stage.stageHeight = this.stage.stageHeight;
        this.touchEnabled = false;
        //背景
        this.begin_bg = new egret.Shape();
        this.begin_bg.graphics.beginFill(0x8c8f98, 1);
        this.begin_bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.begin_bg.graphics.endFill();
        this.begin_bg.touchEnabled = false;
        this.addChild(this.begin_bg);
        //开始标题
        // await RES.getResAsync("begin_title_png");
        this.begin_title = new egret.Bitmap(RES.getRes("begin_title_png"));
        this.begin_title.height = this.begin_title.height * (300 / this.begin_title.width);
        this.begin_title.width = 300;
        this.begin_title.anchorOffsetX = this.begin_title.width / 2;
        this.begin_title.anchorOffsetY = this.begin_title.height / 2;
        this.begin_title.x = this.stage.stageWidth / 2;
        this.begin_title.y = this.stage.stageHeight * 0.2;
        this.addChild(this.begin_title);
        //开始游戏
        this.addChild(this.startBtn);
        this.startBtn.touchEnabled = true;
        this.startBtn.render();
        //底部
        this.end_bg = new egret.Shape();
        this.end_bg.graphics.beginFill(0x727378, 1);
        this.end_bg.graphics.drawRect(0, 0, this.stage.stageWidth, 150);
        this.end_bg.graphics.endFill();
        this.end_bg.anchorOffsetY = this.end_bg.height;
        this.end_bg.y = this.stage.stageHeight;
        this.addChild(this.end_bg);
        //排行榜查看按钮
        this.btnRank.anchorOffsetY = this.btnRank.height / 2;
        this.btnRank.anchorOffsetX = this.btnRank.width / 2;
        this.btnRank.x = 80;
        this.btnRank.y = this.stage.stageHeight - 75;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnRank);
        this.btnRank.touchEnabled = true;
    };
    return StartingMain;
}(egret.DisplayObjectContainer));
__reflect(StartingMain.prototype, "StartingMain");
