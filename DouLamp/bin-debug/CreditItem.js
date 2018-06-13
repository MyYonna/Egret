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
var CreditItem = (function (_super) {
    __extends(CreditItem, _super);
    function CreditItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    CreditItem.prototype.render = function () {
        this.width = this.parent.width - 70;
        this.height = 30;
        var credit = new egret.Shape();
        credit.graphics.beginFill(0x5d1d1d);
        credit.graphics.lineStyle(1, 0x121212);
        credit.graphics.drawRoundRect(0, 0, this.width, this.height, this.height);
        credit.graphics.endFill();
        this.addChild(credit);
        var credit_num = new egret.TextField();
        credit_num.text = "8888";
        credit_num.height = this.height;
        credit_num.width = this.width - this.height * 2;
        credit_num.anchorOffsetX = credit_num.width / 2;
        credit_num.anchorOffsetY = credit_num.height / 2;
        credit_num.x = this.width / 2;
        credit_num.y = this.height / 2;
        credit_num.size = this.height;
        credit_num.textColor = 0xffffff;
        credit_num.textAlign = egret.HorizontalAlign.RIGHT;
        credit_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(credit_num);
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
    };
    return CreditItem;
}(egret.DisplayObjectContainer));
__reflect(CreditItem.prototype, "CreditItem");
