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
var RankHead = (function (_super) {
    __extends(RankHead, _super);
    function RankHead() {
        return _super.call(this) || this;
    }
    RankHead.prototype.render = function () {
        this.height = 60;
        this.width = this.parent.width;
        var bg_shape = new egret.Shape();
        bg_shape.graphics.beginFill(0x363636, 1);
        bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        var l_title = new egret.TextField();
        l_title.x = 20;
        l_title.height = 60;
        l_title.text = "每周一凌晨刷新";
        l_title.textColor = 0x929292;
        l_title.size = 20;
        l_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(l_title);
    };
    return RankHead;
}(egret.DisplayObjectContainer));
__reflect(RankHead.prototype, "RankHead");
