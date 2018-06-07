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
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        return _super.call(this) || this;
    }
    RankUI.prototype.render = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        //处理遮罩，避免开放数据域事件影响主域。
        this.rankingListMask = new egret.Shape();
        this.rankingListMask.graphics.beginFill(0x686b72, 1);
        this.rankingListMask.graphics.drawRect(0, 1, this.width, this.height);
        this.rankingListMask.graphics.endFill();
        this.rankingListMask.alpha = 0.7;
        this.rankingListMask.touchEnabled = true;
        this.addChild(this.rankingListMask);
        this.rankingButtomMask = new egret.Shape();
        this.rankingButtomMask.graphics.beginFill(0x686b72, 1);
        this.rankingButtomMask.graphics.drawRect(0, 1, this.width, 150);
        this.rankingButtomMask.graphics.endFill();
        this.rankingButtomMask.anchorOffsetY = this.rankingButtomMask.height;
        this.rankingButtomMask.y = this.height;
        this.addChild(this.rankingButtomMask);
        // 将离屏的canvas生成图片，贴到主屏
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        this.bitmap = new egret.Bitmap(texture);
        this.bitmap.width = this.width;
        this.bitmap.height = this.height;
        this.bitmap.alpha = 0.8;
        this.addChild(this.bitmap);
        // 画一个返回的按钮
        this.btnClose = new egret.Bitmap(RES.getRes(APP_RANK_BACK));
        this.btnClose.height = 80;
        this.btnClose.width = 80;
        this.btnClose.anchorOffsetY = this.btnClose.height / 2;
        this.btnClose.anchorOffsetX = this.btnClose.width / 2;
        this.btnClose.x = 80;
        this.btnClose.y = this.height - 75;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnClose);
        this.btnClose.touchEnabled = true;
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
    };
    return RankUI;
}(egret.DisplayObjectContainer));
__reflect(RankUI.prototype, "RankUI");
