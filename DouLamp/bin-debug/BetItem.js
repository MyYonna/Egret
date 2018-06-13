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
var BetItem = (function (_super) {
    __extends(BetItem, _super);
    function BetItem(betItemInfo) {
        var _this = _super.call(this) || this;
        _this.index = betItemInfo.index;
        _this.turn_number = betItemInfo.turn_number;
        _this.bet_num = betItemInfo.bet_number;
        _this.icon = betItemInfo.icon;
        _this.header_color = betItemInfo.header_color;
        _this.footer_color = betItemInfo.footer_color;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    BetItem.prototype.render = function () {
        this.width = 30;
        this.height = 80;
        this.x = this.width * this.index + 3 * (this.index + 1);
        this.y = 3;
        //背景
        var bet_item_bg = new egret.Shape();
        bet_item_bg.graphics.beginFill(0xffffff);
        bet_item_bg.graphics.lineStyle(1, 0x121212);
        bet_item_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 1);
        bet_item_bg.graphics.endFill();
        this.addChild(bet_item_bg);
        //头部背景
        var bet_item_header = new egret.Shape();
        bet_item_header.graphics.beginFill(this.header_color);
        bet_item_header.graphics.lineStyle(1, 0x121212);
        bet_item_header.graphics.drawRoundRect(0, 0, this.width, this.height * 0.25, 1);
        bet_item_header.graphics.endFill();
        this.addChild(bet_item_header);
        //头部文字
        var bet = new egret.TextField();
        bet.text = this.turn_number + "";
        bet.textColor = 0x000000;
        bet.size = bet_item_header.height - 5;
        bet.width = this.width;
        bet.height = bet_item_header.height;
        bet.textAlign = egret.HorizontalAlign.CENTER;
        bet.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet);
        //中间图片
        var bet_item_icon = new egret.Bitmap(RES.getRes(this.icon));
        bet_item_icon.width = this.height * 0.25;
        bet_item_icon.height = this.height * 0.25;
        bet_item_icon.anchorOffsetX = bet_item_icon.width / 2;
        bet_item_icon.x = this.width / 2;
        bet_item_icon.y = bet_item_header.height;
        this.addChild(bet_item_icon);
        //押注数背景
        var bet_item_footer = new egret.Shape();
        bet_item_footer.graphics.beginFill(this.footer_color);
        bet_item_footer.graphics.lineStyle(1, 0x121212);
        bet_item_footer.graphics.drawRoundRect(0, 0, this.width, this.height * 0.5, 1);
        bet_item_footer.graphics.endFill();
        bet_item_footer.y = bet_item_icon.y + bet_item_icon.height;
        this.addChild(bet_item_footer);
        //点击押注数量
        var bet_num = new egret.TextField();
        bet_num.text = this.bet_num + "";
        bet_num.textColor = 0xffffff;
        bet_num.size = bet_item_footer.width;
        bet_num.width = this.width;
        bet_num.height = bet_item_footer.height;
        bet_num.y = bet_item_footer.y;
        bet_num.textAlign = egret.HorizontalAlign.CENTER;
        bet_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet_num);
    };
    return BetItem;
}(egret.DisplayObjectContainer));
__reflect(BetItem.prototype, "BetItem");
