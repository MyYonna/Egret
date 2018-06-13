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
var BetPanel = (function (_super) {
    __extends(BetPanel, _super);
    function BetPanel(index) {
        var _this = _super.call(this) || this;
        _this.bet_item_infos = [];
        _this.index = index;
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    BetPanel.prototype.render = function () {
        var _this = this;
        this.height = 80 + 3 + 3;
        this.width = this.bet_item_infos.length * (30 + 3) + 3;
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
        this.y = 200 + 20 + this.index * (this.height + 10);
        var bet_bg = new egret.Shape();
        bet_bg.graphics.beginFill(0xffffff);
        bet_bg.graphics.lineStyle(1, 0x121212);
        bet_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        bet_bg.graphics.endFill();
        this.addChild(bet_bg);
        this.bet_item_infos.forEach(function (item, index) {
            _this.addChild(new BetItem(item));
        });
    };
    BetPanel.prototype.init = function () {
        if (this.index == 0) {
            this.bet_item_infos.push(new BetItemInfo(0, Fruit_Bet[Fruit_ICON.Apple], Fruit_Header_Color[Fruit_ICON.Apple], Fruit_Icons[Fruit_ICON.Apple], 0, Fruit_Footer_Color[Fruit_ICON.Apple]));
            this.bet_item_infos.push(new BetItemInfo(1, Fruit_Bet[Fruit_ICON.Watermelon], Fruit_Header_Color[Fruit_ICON.Watermelon], Fruit_Icons[Fruit_ICON.Watermelon], 0, Fruit_Footer_Color[Fruit_ICON.Watermelon]));
            this.bet_item_infos.push(new BetItemInfo(2, Fruit_Bet[Fruit_ICON.Cocco], Fruit_Header_Color[Fruit_ICON.Cocco], Fruit_Icons[Fruit_ICON.Cocco], 0, Fruit_Footer_Color[Fruit_ICON.Cocco]));
            this.bet_item_infos.push(new BetItemInfo(3, Fruit_Bet[Fruit_ICON.Seven], Fruit_Header_Color[Fruit_ICON.Seven], Fruit_Icons[Fruit_ICON.Seven], 0, Fruit_Footer_Color[Fruit_ICON.Seven]));
            this.bet_item_infos.push(new BetItemInfo(4, Fruit_Bet[Fruit_ICON.Chip_50], Fruit_Header_Color[Fruit_ICON.Chip_50], Fruit_Icons[Fruit_ICON.Chip_50], 0, Fruit_Footer_Color[Fruit_ICON.Chip_50]));
            this.bet_item_infos.push(new BetItemInfo(5, Fruit_Bet[Fruit_ICON.Chip_100], Fruit_Header_Color[Fruit_ICON.Chip_100], Fruit_Icons[Fruit_ICON.Chip_100], 0, Fruit_Footer_Color[Fruit_ICON.Chip_100]));
        }
        else {
            this.bet_item_infos.push(new BetItemInfo(0, Fruit_Bet[Fruit_ICON.Banana], Fruit_Header_Color[Fruit_ICON.Banana], Fruit_Icons[Fruit_ICON.Banana], 0, Fruit_Footer_Color[Fruit_ICON.Banana]));
            this.bet_item_infos.push(new BetItemInfo(1, Fruit_Bet[Fruit_ICON.Lime], Fruit_Header_Color[Fruit_ICON.Lime], Fruit_Icons[Fruit_ICON.Lime], 0, Fruit_Footer_Color[Fruit_ICON.Lime]));
            this.bet_item_infos.push(new BetItemInfo(2, Fruit_Bet[Fruit_ICON.Arancia], Fruit_Header_Color[Fruit_ICON.Arancia], Fruit_Icons[Fruit_ICON.Arancia], 0, Fruit_Footer_Color[Fruit_ICON.Arancia]));
            this.bet_item_infos.push(new BetItemInfo(3, Fruit_Bet[Fruit_ICON.Strawberry], Fruit_Header_Color[Fruit_ICON.Strawberry], Fruit_Icons[Fruit_ICON.Strawberry], 0, Fruit_Footer_Color[Fruit_ICON.Strawberry]));
        }
    };
    return BetPanel;
}(egret.DisplayObjectContainer));
__reflect(BetPanel.prototype, "BetPanel");
