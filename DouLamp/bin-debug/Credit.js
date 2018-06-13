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
var Credit = (function (_super) {
    __extends(Credit, _super);
    function Credit() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    Credit.prototype.render = function () {
        //大背景
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xFFEB1D);
        bg.graphics.lineStyle(1, 0x471200);
        bg.graphics.drawEllipse(0, 0, this.parent.width * 0.9, 130);
        bg.graphics.endFill();
        this.addChild(bg);
        //内圈背景
        var center_bg = new egret.Shape();
        center_bg.graphics.beginFill(0xFFFFBF);
        center_bg.graphics.lineStyle(1, 0x471200);
        center_bg.graphics.drawEllipse(0, 0, bg.width - 15, bg.height - 15);
        center_bg.graphics.endFill();
        center_bg.anchorOffsetX = center_bg.width / 2;
        center_bg.anchorOffsetY = center_bg.height / 2;
        center_bg.x = this.width / 2;
        center_bg.y = this.height / 2;
        this.addChild(center_bg);
        //钱币图标
        var money_icon = new egret.Bitmap(RES.getRes("Money_png"));
        money_icon.scaleX = 0.8;
        money_icon.scaleY = 0.8;
        this.addChild(money_icon);
        //credit范围
        // let credit = new egret.Shape();
        // credit.graphics.beginFill(0x5d1d1d);
        // credit.graphics.lineStyle(1,0x121212);
        // credit.graphics.drawRoundRect(0,0,this.width-70,30,30);
        // credit.graphics.endFill();
        var credit = new CreditItem();
        this.addChild(credit);
        // credit.anchorOffsetX = credit.width/2;
        // credit.anchorOffsetY = credit.height;
        // credit.x = this.width/2;
        // credit.y= (this.height/2)-2;
        var bonus_win = new egret.Shape();
        bonus_win.graphics.beginFill(0x5d1d1d);
        bonus_win.graphics.lineStyle(1, 0x121212);
        bonus_win.graphics.drawRoundRect(0, 0, this.width - 70, 30, 30);
        bonus_win.graphics.endFill();
        bonus_win.anchorOffsetX = bonus_win.width / 2;
        bonus_win.x = this.width / 2;
        bonus_win.y = (this.height / 2) + 2;
        this.addChild(bonus_win);
        var credit_text = new egret.TextField();
        credit_text.text = "CREDIT";
        credit_text.width = this.width;
        credit_text.height = 15;
        credit_text.textAlign = egret.HorizontalAlign.CENTER;
        credit_text.anchorOffsetY = credit_text.height;
        credit_text.y = credit.y - credit.height - 2;
        credit_text.size = 15;
        credit_text.textColor = 0xb63f1f;
        this.addChild(credit_text);
        var bonus_win_text = new egret.TextField();
        bonus_win_text.text = "BONUS-WIN";
        bonus_win_text.width = this.width;
        bonus_win_text.height = 15;
        bonus_win_text.textAlign = egret.HorizontalAlign.CENTER;
        bonus_win_text.y = bonus_win.y + bonus_win.height + 2;
        bonus_win_text.size = 15;
        bonus_win_text.textColor = 0xb63f1f;
        this.addChild(bonus_win_text);
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
    };
    return Credit;
}(egret.DisplayObjectContainer));
__reflect(Credit.prototype, "Credit");
