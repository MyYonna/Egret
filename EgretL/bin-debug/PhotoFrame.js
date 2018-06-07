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
var PhotoFrame = (function (_super) {
    __extends(PhotoFrame, _super);
    function PhotoFrame() {
        return _super.call(this) || this;
    }
    PhotoFrame.prototype.render = function () {
        //设置本容器的属性
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var photoFrameW = stageWidth - 100;
        var photoFrameH = photoFrameW;
        this.width = photoFrameW;
        this.height = photoFrameH;
        //重新设置锚点
        this.anchorOffsetX = photoFrameW / 2;
        this.anchorOffsetY = photoFrameH / 2;
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        //为本容器加入背景组件
        var photoFrameBg = new egret.Shape();
        photoFrameBg.graphics.beginFill(PF_BG_COLOR, 1); //设置相框背景
        photoFrameBg.graphics.lineStyle(PF_BR_WIDTH, PF_BR_COLOR); //设置相框的边框
        photoFrameBg.graphics.drawRect(0, 0, photoFrameW, photoFrameH);
        photoFrameBg.graphics.endFill();
        this.addChild(photoFrameBg);
    };
    return PhotoFrame;
}(egret.DisplayObjectContainer));
__reflect(PhotoFrame.prototype, "PhotoFrame");
