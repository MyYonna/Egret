var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BetItemInfo = (function () {
    function BetItemInfo(index, turn_number, header_color, icon, bet_number, footer_color) {
        this.index = index;
        this.turn_number = turn_number;
        this.header_color = header_color;
        this.icon = icon;
        this.bet_number = bet_number;
        this.footer_color = footer_color;
    }
    return BetItemInfo;
}());
__reflect(BetItemInfo.prototype, "BetItemInfo");
