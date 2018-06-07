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
