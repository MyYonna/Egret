var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FruitHistory = (function (_super) {
    __extends(FruitHistory, _super);
    function FruitHistory() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistory.prototype.render = function () {
        this.height = this.stage.stageHeight * 0.9;
        this.width = 35;
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.stageHeight / 2;
        // let historyShape = new egret.Shape();
        // historyShape.graphics.beginFill(0x141414);
        // historyShape.graphics.lineStyle(1, 0x262626);
        // historyShape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        // historyShape.graphics.endFill();
        // this.addChild(historyShape);
        var history_header = new egret.Bitmap(RES.getRes("History_png"));
        history_header.width = 35;
        history_header.height = 35;
        this.addChild(history_header);
        var history_content = new FruitHistoryContent();
        this.addChild(history_content);
        for (var i = 0; i < 20; i++) {
            var history_item1 = new FruitHistoryItem();
            history_content.addItem(history_item1);
        }
        var history_item2 = new FruitHistoryItem();
        history_content.addItem(history_item2);
        var history_item3 = new FruitHistoryItem();
        history_content.addItem(history_item3);
        var history_item4 = new FruitHistoryItem();
        history_content.addItem(history_item4);
    };
    return FruitHistory;
}(egret.DisplayObjectContainer));
__reflect(FruitHistory.prototype, "FruitHistory");
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
        this.height = 70 + 3 + 3;
        this.width = this.bet_item_infos.length * (30 + 3) + 3;
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
        this.y = 125 + this.index * (this.height + 5);
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
        bg.graphics.drawEllipse(0, 0, this.parent.width * 0.9, 120);
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
        //credit范围筹码
        var credit = new CreditItem();
        this.addChild(credit);
        credit.anchorOffsetY = credit.height;
        credit.y = (this.height / 2) - 15;
        //bonus-win奖金
        var bonus_win = new CreditItem();
        this.addChild(bonus_win);
        bonus_win.y = (this.height / 2) + 5;
        //说明
        var credit_text = new egret.TextField();
        credit_text.text = "CREDIT";
        credit_text.bold = true;
        credit_text.width = this.width;
        credit_text.height = 15;
        credit_text.textAlign = egret.HorizontalAlign.CENTER;
        credit_text.anchorOffsetY = credit_text.height;
        credit_text.y = credit.y - credit.height - 2;
        credit_text.size = 15;
        credit_text.textColor = 0xb63f1f;
        this.addChild(credit_text);
        //奖金区
        var bonus_win_text = new egret.TextField();
        bonus_win_text.text = "BONUS-WIN";
        bonus_win_text.bold = true;
        bonus_win_text.width = this.width;
        bonus_win_text.height = 15;
        bonus_win_text.textAlign = egret.HorizontalAlign.CENTER;
        bonus_win_text.y = bonus_win.y + bonus_win.height + 2;
        bonus_win_text.size = 15;
        bonus_win_text.textColor = 0xb63f1f;
        this.addChild(bonus_win_text);
        //添加向上将奖金划入筹码区
        var winToCredit = new egret.Bitmap(RES.getRes("WinToCredit_png"));
        winToCredit.scaleX = 0.5;
        winToCredit.scaleY = 0.5;
        winToCredit.anchorOffsetX = winToCredit.width / 2;
        winToCredit.anchorOffsetY = winToCredit.height / 2;
        winToCredit.skewY = 180;
        winToCredit.x = credit.x + credit.width / 2 + 10;
        winToCredit.y = this.height / 2;
        this.addChild(winToCredit);
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
    };
    return Credit;
}(egret.DisplayObjectContainer));
__reflect(Credit.prototype, "Credit");
var CreditItem = (function (_super) {
    __extends(CreditItem, _super);
    function CreditItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    CreditItem.prototype.render = function () {
        this.width = this.parent.width - 90;
        this.height = 30;
        this.anchorOffsetX = this.width / 2;
        this.x = this.parent.width / 2;
        var credit = new egret.Shape();
        credit.graphics.beginFill(0x5d1d1d);
        credit.graphics.lineStyle(1, 0x121212);
        credit.graphics.drawRoundRect(0, 0, this.width, this.height, this.height);
        credit.graphics.endFill();
        this.addChild(credit);
        var credit_num = new egret.TextField();
        credit_num.text = "888888";
        credit_num.height = this.height;
        credit_num.width = this.width - this.height;
        credit_num.anchorOffsetX = credit_num.width / 2;
        credit_num.anchorOffsetY = credit_num.height / 2;
        credit_num.x = this.width / 2;
        credit_num.y = this.height / 2;
        credit_num.size = this.height;
        credit_num.textColor = 0xffffff;
        credit_num.textAlign = egret.HorizontalAlign.CENTER;
        credit_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(credit_num);
    };
    return CreditItem;
}(egret.DisplayObjectContainer));
__reflect(CreditItem.prototype, "CreditItem");
var FruitDiscIcon = (function (_super) {
    __extends(FruitDiscIcon, _super);
    function FruitDiscIcon(icon_res, row_index, column_index) {
        var _this = _super.call(this) || this;
        _this.icon_res = icon_res;
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
        //icon的背景和描边
        var icon_round = new egret.Shape();
        icon_round.graphics.beginFill(ICON_COLOR[(this.row_index + this.column_index) % 3]);
        icon_round.graphics.lineStyle(1, 0x87a26b);
        icon_round.graphics.drawRoundRect(0, 0, this.width, this.height, 20);
        icon_round.graphics.endFill();
        this.addChild(icon_round);
        //icon的图片
        this.icon = new egret.Bitmap(RES.getRes(this.icon_res));
        this.icon.width = this.width;
        this.icon.height = this.height;
        this.icon.anchorOffsetX = this.icon.width / 2;
        this.icon.anchorOffsetY = this.icon.height / 2;
        this.icon.x = this.width / 2;
        this.icon.y = this.height / 2;
        this.addChild(this.icon);
    };
    FruitDiscIcon.prototype.giveVFX = function () {
        var color = 0xffffff; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        //颜色矩阵数组
        var colorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 100,
            0, 0, 1, 0, 100,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.icon.filters = [glowFilter, colorFlilter];
    };
    FruitDiscIcon.prototype.clearVFX = function () {
        this.icon.filters = [];
    };
    return FruitDiscIcon;
}(egret.DisplayObjectContainer));
__reflect(FruitDiscIcon.prototype, "FruitDiscIcon");
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
        this.height = 70;
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
        bet_item_icon.width = this.height * 0.3;
        bet_item_icon.height = this.height * 0.3;
        bet_item_icon.anchorOffsetX = bet_item_icon.width / 2;
        bet_item_icon.x = this.width / 2;
        bet_item_icon.y = bet_item_header.height;
        this.addChild(bet_item_icon);
        //押注数背景
        var bet_item_footer = new egret.Shape();
        bet_item_footer.graphics.beginFill(this.footer_color);
        bet_item_footer.graphics.lineStyle(1, 0x121212);
        bet_item_footer.graphics.drawRoundRect(0, 0, this.width, this.height * 0.45, 1);
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
var FruitHistoryContent = (function (_super) {
    __extends(FruitHistoryContent, _super);
    function FruitHistoryContent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistoryContent.prototype.render = function () {
        this.listContainer = new egret.DisplayObjectContainer();
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height - this.parent.getChildAt(0).height;
        this.y = this.parent.getChildAt(0).height;
        this.listContainer.width = this.width;
    };
    FruitHistoryContent.prototype.addItem = function (item) {
        this.listContainer.addChild(item);
    };
    return FruitHistoryContent;
}(egret.ScrollView));
__reflect(FruitHistoryContent.prototype, "FruitHistoryContent");
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
var GameDisc = (function (_super) {
    __extends(GameDisc, _super);
    function GameDisc() {
        var _this = _super.call(this) || this;
        _this.icon_arr = [];
        _this.icon_res = [];
        _this.fruitDiscIcons = [];
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    GameDisc.prototype.render = function () {
        var _this = this;
        this.height = this.stage.stageHeight * 0.9;
        this.width = this.height;
        // this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = 30 + 35 + 30;
        this.y = this.stage.stageHeight / 2;
        var gameDiscShape = new egret.Shape();
        gameDiscShape.graphics.beginFill(0x141414);
        gameDiscShape.graphics.lineStyle(3, 0x262626);
        gameDiscShape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        gameDiscShape.graphics.endFill();
        this.addChild(gameDiscShape);
        this.icon_arr.forEach(function (item, index) {
            if (item != null) {
                var r = Math.floor(index / 7);
                var c = Math.floor(index % 7);
                var fruitDiscIcon = new FruitDiscIcon(item, r, c);
                _this.fruitDiscIcons.push(fruitDiscIcon);
                _this.addChild(fruitDiscIcon);
            }
        });
        var center = new egret.Bitmap(RES.getRes("bg_jpg"));
        center.height = this.height - (((this.height - 32) / 7 + 8) * 2);
        center.width = this.width - (((this.width - 32) / 7 + 8) * 2);
        center.anchorOffsetX = center.width / 2;
        center.anchorOffsetY = center.height / 2;
        center.x = this.width / 2;
        center.y = this.height / 2;
        this.addChild(center);
    };
    GameDisc.prototype.init = function () {
        this.icon_res.push("Arancia_png");
        this.icon_res.push("Banana_png");
        this.icon_res.push("Chip_50_png");
        this.icon_res.push("Chip_100_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Lime_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Watermelon_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Dice_png");
        this.icon_res.push("Dice_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Cocco_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Lime_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Seven_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Banana_png");
        this.icon_res.push("Arancia_png");
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                if (i == 0 || i == 6) {
                    this.icon_arr.push(this.icon_res.shift());
                }
                else {
                    if (j == 0 || j == 6) {
                        this.icon_arr.push(this.icon_res.shift());
                    }
                    else {
                        this.icon_arr.push(null);
                    }
                }
            }
        }
    };
    return GameDisc;
}(egret.DisplayObjectContainer));
__reflect(GameDisc.prototype, "GameDisc");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ICON_COLOR = [0x1194A8, 0xD89A14, 0X589120];
var Fruit_Icons = ["Apple_png", "Watermelon_png", "Cocco_png", "Seven_png", "Chip_50_png", "Chip_100_png", "Banana_png", "Lime_png", "Arancia_png", "Strawberry_png", "Dice_png"];
var Fruit_Bet = [5, 20, 30, 40, 50, 100, 20, 15, 10, 2];
var Fruit_Header_Color = [0xFB459A, 0x92E02A, 0x92E02A, 0x92E02A, 0xFB459A, 0xFB459A, 0x92E02A, 0x92E02A, 0x92E02A, 0xFB459A];
var Fruit_Footer_Color = [0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d];
var Fruit_Excute_Order = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 23, 22, 21, 20, 19, 18, 17, 15, 13, 11, 9, 7];
var Fruit_ICON;
(function (Fruit_ICON) {
    Fruit_ICON[Fruit_ICON["Apple"] = 0] = "Apple";
    Fruit_ICON[Fruit_ICON["Watermelon"] = 1] = "Watermelon";
    Fruit_ICON[Fruit_ICON["Cocco"] = 2] = "Cocco";
    Fruit_ICON[Fruit_ICON["Seven"] = 3] = "Seven";
    Fruit_ICON[Fruit_ICON["Chip_50"] = 4] = "Chip_50";
    Fruit_ICON[Fruit_ICON["Chip_100"] = 5] = "Chip_100";
    Fruit_ICON[Fruit_ICON["Banana"] = 6] = "Banana";
    Fruit_ICON[Fruit_ICON["Lime"] = 7] = "Lime";
    Fruit_ICON[Fruit_ICON["Arancia"] = 8] = "Arancia";
    Fruit_ICON[Fruit_ICON["Strawberry"] = 9] = "Strawberry";
    Fruit_ICON[Fruit_ICON["Dice"] = 10] = "Dice";
})(Fruit_ICON || (Fruit_ICON = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.i = 0;
        _this.j = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x141414);
        bg.graphics.drawRect(0, 0, stageW, stageH);
        bg.graphics.endFill();
        this.addChild(bg);
        var history = new FruitHistory();
        this.addChild(history);
        this.gameDisc = new GameDisc();
        this.addChild(this.gameDisc);
        var rightPanel = new RightPanel();
        this.addChild(rightPanel);
        rightPanel.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginMarquee, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.beginMarquee = function () {
        this.j++;
        var that = this;
        this.i = this.i % 24;
        var fruitDiscIcon = this.gameDisc.fruitDiscIcons[Fruit_Excute_Order[this.i]];
        fruitDiscIcon.giveVFX();
        fruitDiscIcon.scaleX = 1.1;
        fruitDiscIcon.scaleY = 1.1;
        if (this.j > 650) {
            var sure_value = Math.round(Math.random() * 650);
            var fruit_res = this.weatherFruit(sure_value);
            if (fruitDiscIcon.icon_res != fruit_res) {
            }
            else {
                this.i = 0;
                this.j = 0;
                return;
            }
        }
        setTimeout(function () {
            fruitDiscIcon.scaleX = 1;
            fruitDiscIcon.scaleY = 1;
            fruitDiscIcon.clearVFX();
            that.i++;
            that.beginMarquee();
        }, 20);
    };
    //633
    Main.prototype.weatherFruit = function (value) {
        var fruit;
        if (value > (650 - 6)) {
            fruit = Fruit_Icons[Fruit_ICON.Chip_100];
        }
        else if (value > (650 - 6 - 12)) {
            fruit = Fruit_Icons[Fruit_ICON.Chip_50];
        }
        else if (value > (650 - 6 - 12 - 15)) {
            fruit = Fruit_Icons[Fruit_ICON.Seven];
        }
        else if (value > (650 - 6 - 12 - 15 - 20)) {
            fruit = Fruit_Icons[Fruit_ICON.Cocco];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30)) {
            fruit = Fruit_Icons[Fruit_ICON.Watermelon];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30 - 120)) {
            fruit = Fruit_Icons[Fruit_ICON.Apple];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30 - 120 - 300)) {
            fruit = Fruit_Icons[Fruit_ICON.Strawberry];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60)) {
            fruit = Fruit_Icons[Fruit_ICON.Arancia];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60 - 40)) {
            fruit = Fruit_Icons[Fruit_ICON.Lime];
        }
        else if (value > (650 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60 - 40 - 30)) {
            fruit = Fruit_Icons[Fruit_ICON.Banana];
        }
        else {
            fruit = Fruit_Icons[Fruit_ICON.Dice];
        }
        return fruit;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var RightPanel = (function (_super) {
    __extends(RightPanel, _super);
    function RightPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RightPanel.prototype.render = function () {
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth - this.parent.getChildAt(2).x - this.parent.getChildAt(2).width - 10;
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height / 2;
        this.y = this.stage.stageHeight / 2;
        this.x = this.stage.stageWidth;
        var right_panel_bg = new egret.Shape();
        right_panel_bg.graphics.beginFill(0xf0f0f0);
        right_panel_bg.graphics.lineStyle(2, 0x121212);
        right_panel_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);
        var credit = new Credit();
        this.addChild(credit);
        var betPanel = new BetPanel(0);
        this.addChild(betPanel);
        var betPanel2 = new BetPanel(1);
        this.addChild(betPanel2);
        this.start_btn = new BetBtn("START");
        this.addChild(this.start_btn);
        this.start_btn.anchorOffsetX = this.start_btn.width / 2;
        this.start_btn.x = this.width / 2;
        this.start_btn.y = betPanel2.y + betPanel2.height + 5;
        var left_btn = new BetBtn("LEFT");
        this.addChild(left_btn);
        left_btn.anchorOffsetX = left_btn.width;
        left_btn.x = this.width / 2 - 5;
        left_btn.y = this.start_btn.y + this.start_btn.height + 5;
        var right_btn = new BetBtn("RIGHT");
        this.addChild(right_btn);
        right_btn.x = this.width / 2 + 5;
        right_btn.y = this.start_btn.y + this.start_btn.height + 5;
        this.start_btn.touchEnabled = true;
        // this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginMarquee,this);
    };
    RightPanel.prototype.beginMarquee = function (i) {
        if (i === void 0) { i = 0; }
        console.log(i);
        // this.gameDisc.fruitDiscIcons[i].scaleX = 1.1;
        // this.gameDisc.fruitDiscIcons[i].scaleY = 1.1;
        setTimeout(function () {
            this.beginMarquee(i++);
        }, 1000);
    };
    return RightPanel;
}(egret.DisplayObjectContainer));
__reflect(RightPanel.prototype, "RightPanel");
;window.Main = Main;