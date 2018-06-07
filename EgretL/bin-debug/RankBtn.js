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
var RankBtn = (function (_super) {
    __extends(RankBtn, _super);
    function RankBtn(res) {
        return _super.call(this, res) || this;
    }
    RankBtn.prototype.render = function () {
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.height - 75;
        this.touchEnabled = true;
    };
    return RankBtn;
}(egret.Bitmap));
__reflect(RankBtn.prototype, "RankBtn");
