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
var StartBtn = (function (_super) {
    __extends(StartBtn, _super);
    function StartBtn() {
        return _super.call(this) || this;
    }
    StartBtn.prototype.render = function () {
        //背景
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xf44133, 1);
        bgShape.graphics.drawRoundRect(0, 0, 300, 80, 80, 80);
        bgShape.graphics.endFill();
        this.addChild(bgShape);
        //头部图片
        var startBtnImg = new egret.Bitmap(RES.getRes("start_game_png"));
        startBtnImg.x = 20;
        startBtnImg.anchorOffsetY = startBtnImg.height / 2;
        startBtnImg.y = 40;
        this.addChild(startBtnImg);
        //文字
        var label = new egret.TextField();
        label.text = "开始游戏";
        label.textColor = 0xffffff;
        label.fontFamily = "KaiTi";
        label.size = 40;
        label.bold = true;
        label.italic = true;
        label.height = 80;
        label.x = startBtnImg.width + 10;
        // label.width = 160;
        // label.textAlign = egret.HorizontalAlign.LEFT;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(label);
        //位置
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight * 0.7;
        this.touchEnabled = true;
    };
    return StartBtn;
}(egret.DisplayObjectContainer));
__reflect(StartBtn.prototype, "StartBtn");
