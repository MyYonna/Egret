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
var BetBtn = (function (_super) {
    __extends(BetBtn, _super);
    function BetBtn(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    BetBtn.prototype.render = function () {
        var btn_bg = new egret.Shape();
        btn_bg.graphics.beginFill(0x1899B9);
        btn_bg.graphics.lineStyle(1, 0x135673);
        btn_bg.graphics.drawRoundRect(0, 0, 80, 25, 20);
        btn_bg.graphics.endFill();
        this.addChild(btn_bg);
        var text_bg = new egret.Shape();
        text_bg.graphics.beginFill(0xFBFB0D);
        text_bg.graphics.lineStyle(1, 0x135673);
        text_bg.graphics.drawRoundRect(0, 0, 70, 20, 20);
        text_bg.graphics.endFill();
        text_bg.anchorOffsetX = text_bg.width / 2;
        text_bg.anchorOffsetY = text_bg.height / 2;
        text_bg.x = this.width / 2;
        text_bg.y = this.height / 2;
        this.addChild(text_bg);
        var text = new egret.TextField();
        text.text = this.text;
        text.bold = true;
        text.textColor = 0x000000;
        text.size = text_bg.height - 10;
        text.anchorOffsetX = text.width / 2;
        text.anchorOffsetY = text.height / 2;
        text.x = this.width / 2;
        text.y = this.height / 2;
        this.addChild(text);
    };
    return BetBtn;
}(egret.DisplayObjectContainer));
__reflect(BetBtn.prototype, "BetBtn");
