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
    function PhotoFrame(stage) {
        var _this = _super.call(this) || this;
        _this.container = stage;
        _this.drawPhotoFrame();
        return _this;
    }
    PhotoFrame.prototype.drawPhotoFrame = function () {
        var stageWidth = this.container.width;
        var stageHeight = this.container.height;
        var photoFrameW = stageWidth - 100;
        var photoFrameH = photoFrameW;
        this.graphics.beginFill(PF_BG_COLOR, 1); //设置相框背景
        //重新设置锚点
        this.anchorOffsetX = photoFrameW / 2;
        this.anchorOffsetY = photoFrameH / 2;
        this.graphics.lineStyle(PF_BR_WIDTH, PF_BR_COLOR); //设置相框的边框
        this.graphics.drawRect(0, 0, photoFrameW, photoFrameH);
        this.graphics.endFill();
        this.width = photoFrameW;
        this.height = photoFrameH;
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        this.container.addChild(this);
    };
    return PhotoFrame;
}(egret.Sprite));
__reflect(PhotoFrame.prototype, "PhotoFrame");
