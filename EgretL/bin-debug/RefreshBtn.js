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
var RefreshBtn = (function (_super) {
    __extends(RefreshBtn, _super);
    function RefreshBtn(res) {
        return _super.call(this, res) || this;
    }
    RefreshBtn.prototype.render = function () {
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetX = this.width;
        this.x = this.stage.width - 100;
        this.y = this.stage.height - 75;
        this.touchEnabled = true;
    };
    return RefreshBtn;
}(egret.Bitmap));
__reflect(RefreshBtn.prototype, "RefreshBtn");
