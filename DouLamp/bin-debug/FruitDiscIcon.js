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
var FruitDiscIcon = (function (_super) {
    __extends(FruitDiscIcon, _super);
    function FruitDiscIcon(icon, row_index, column_index) {
        var _this = _super.call(this) || this;
        _this.icon = icon;
        _this.row_index = row_index;
        _this.column_index = column_index;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitDiscIcon.prototype.render = function () {
        this.width = (this.parent.width - 32) / 7;
        this.height = (this.parent.height - 32) / 7;
        this.x = this.column_index * (this.width) + (this.column_index + 1) * 4;
        this.y = this.row_index * (this.height) + (this.row_index + 1) * 4;
        ;
        var icon_round = new egret.Shape();
        icon_round.graphics.beginFill(ICON_COLOR[(this.row_index + this.column_index) % 3]);
        icon_round.graphics.lineStyle(1, 0x87a26b);
        icon_round.graphics.drawRoundRect(0, 0, this.width, this.height, 20);
        icon_round.graphics.endFill();
        this.addChild(icon_round);
        var icon = new egret.Bitmap(RES.getRes(this.icon));
        icon.width = this.width;
        icon.height = this.height;
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2;
        icon.x = this.width / 2;
        icon.y = this.height / 2;
        this.addChild(icon);
    };
    return FruitDiscIcon;
}(egret.DisplayObjectContainer));
__reflect(FruitDiscIcon.prototype, "FruitDiscIcon");
