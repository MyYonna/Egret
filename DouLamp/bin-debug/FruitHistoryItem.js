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
var FruitHistoryItem = (function (_super) {
    __extends(FruitHistoryItem, _super);
    function FruitHistoryItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistoryItem.prototype.render = function () {
        this.width = this.parent.width;
        this.height = this.width;
        this.y = (this.parent.numChildren - 1) * this.height;
        var item_bg = new egret.Shape();
        item_bg.graphics.beginFill(0x292a2c);
        item_bg.graphics.lineStyle(1, 0x6b6565);
        item_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        item_bg.graphics.endFill();
        this.addChild(item_bg);
        var item_icon = new egret.Bitmap(RES.getRes("Arancia_png"));
        item_icon.width = this.width - 4;
        item_icon.height = this.height - 4;
        item_icon.anchorOffsetX = item_icon.width / 2;
        item_icon.anchorOffsetY = item_icon.height / 2;
        item_icon.x = this.width / 2;
        item_icon.y = this.height / 2;
        this.addChild(item_icon);
    };
    return FruitHistoryItem;
}(egret.DisplayObjectContainer));
__reflect(FruitHistoryItem.prototype, "FruitHistoryItem");
