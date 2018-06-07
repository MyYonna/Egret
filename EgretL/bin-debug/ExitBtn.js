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
var ExitBtn = (function (_super) {
    __extends(ExitBtn, _super);
    function ExitBtn(res) {
        return _super.call(this, res) || this;
    }
    ExitBtn.prototype.render = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = 30;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.exitMiniProgram({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }, this);
    };
    return ExitBtn;
}(egret.Bitmap));
__reflect(ExitBtn.prototype, "ExitBtn");
