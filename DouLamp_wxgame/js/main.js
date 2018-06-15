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
        this.text_bg = new egret.Shape();
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawRoundRect(0, 0, 70, 20, 20);
        this.text_bg.graphics.endFill();
        this.text_bg.anchorOffsetX = this.text_bg.width / 2;
        this.text_bg.anchorOffsetY = this.text_bg.height / 2;
        this.text_bg.x = this.width / 2;
        this.text_bg.y = this.height / 2;
        this.addChild(this.text_bg);
        this.text_field = new egret.TextField();
        this.text_field.text = this.text;
        this.text_field.bold = true;
        this.text_field.textColor = 0xffffff;
        this.text_field.size = this.text_bg.height - 10;
        this.text_field.width = this.width;
        this.text_field.height = this.height;
        this.text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.text_field);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
    };
    BetBtn.prototype.disableBtn = function () {
        this.touchEnabled = false;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawRoundRect(0, 0, 70, 20, 20);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0xffffff;
    };
    BetBtn.prototype.enableBtn = function () {
        this.touchEnabled = true;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawRoundRect(0, 0, 70, 20, 20);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0x000000;
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
var BetOnBtn = (function (_super) {
    __extends(BetOnBtn, _super);
    function BetOnBtn(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    BetOnBtn.prototype.render = function () {
        this.width = 30;
        this.height = 30;
        //外圈圆
        var btn_bg = new egret.Shape();
        btn_bg.graphics.beginFill(0x1899B9);
        btn_bg.graphics.lineStyle(1, 0x135673);
        btn_bg.graphics.drawCircle(this.width / 2, this.height / 2, 15);
        btn_bg.graphics.endFill();
        this.addChild(btn_bg);
        //内圈圆
        this.text_bg = new egret.Shape();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawCircle(this.width / 2, this.height / 2, 13);
        this.text_bg.graphics.endFill();
        this.addChild(this.text_bg);
        //控制字体位置和大小
        this.text_field = new egret.TextField();
        this.text_field.text = this.text;
        this.text_field.textColor = 0x000000;
        this.text_field.bold = true;
        this.text_field.size = this.text_bg.height / 2 - 3;
        this.text_field.width = this.width;
        this.text_field.height = this.height;
        this.text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.text_field);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
        this.touchEnabled = true;
    };
    //按钮不可用
    BetOnBtn.prototype.disableBtn = function () {
        this.touchEnabled = false;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawCircle(this.width / 2, this.height / 2, 13);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0xffffff;
    };
    //按钮可用
    BetOnBtn.prototype.enableBtn = function () {
        this.touchEnabled = true;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1, 0x135673);
        this.text_bg.graphics.drawCircle(this.width / 2, this.height / 2, 13);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0x000000;
    };
    return BetOnBtn;
}(egret.DisplayObjectContainer));
__reflect(BetOnBtn.prototype, "BetOnBtn");
var BetPanel = (function (_super) {
    __extends(BetPanel, _super);
    function BetPanel(index) {
        var _this = _super.call(this) || this;
        _this.bet_item_infos = [];
        _this.betItems = [];
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
        var rightPanel = this.parent;
        this.y = rightPanel.credit.y + rightPanel.credit.height + this.index * (this.height + 5);
        var bet_bg = new egret.Shape();
        bet_bg.graphics.beginFill(0xffffff);
        bet_bg.graphics.lineStyle(1, 0x121212);
        bet_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        bet_bg.graphics.endFill();
        this.addChild(bet_bg);
        this.bet_item_infos.forEach(function (item, index) {
            var betItem = new BetItem(item);
            _this.addChild(betItem);
            _this.betItems.push(betItem);
            betItem.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addBet, _this);
        });
    };
    //点击图片，进行押注,1：押注数不能超过9,2：筹码区的金额不能低于0
    BetPanel.prototype.addBet = function (event) {
        var target = event.currentTarget;
        var betItem = target.parent;
        if (betItem.bet_num < 9) {
            //改变筹码区的数值
            var rightPanel = this.parent;
            if (rightPanel.credit.creditItem.credit_num >= 1) {
                rightPanel.credit.creditItem.credit_num--;
                rightPanel.credit.creditItem.credit_num_text.text = rightPanel.credit.creditItem.credit_num + "";
                bet_buffer++;
                betItem.bet_num++;
                betItem.bet_text_num.text = betItem.bet_num + "";
            }
        }
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
        var that = this;
        //credit范围筹码
        var score = wx.getStorageSync("dou_lamp_rank_score");
        console.log(score);
        this.creditItem = new CreditItem(parseInt(score == "" ? "200" : score, 0));
        this.addChild(this.creditItem);
        this.creditItem.anchorOffsetY = this.creditItem.height;
        this.creditItem.y = (this.height / 2) - 15;
        //bonus-win奖金
        this.bonusWinItem = new CreditItem(0);
        this.addChild(this.bonusWinItem);
        this.bonusWinItem.y = (this.height / 2) + 5;
        //说明
        var credit_text = new egret.TextField();
        credit_text.text = "CREDIT";
        credit_text.bold = true;
        credit_text.width = this.width;
        credit_text.height = 15;
        credit_text.textAlign = egret.HorizontalAlign.CENTER;
        credit_text.anchorOffsetY = credit_text.height;
        credit_text.y = this.creditItem.y - this.creditItem.height - 2;
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
        bonus_win_text.y = this.bonusWinItem.y + this.bonusWinItem.height + 2;
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
        winToCredit.x = this.creditItem.x + this.creditItem.width / 2 + 10;
        winToCredit.y = this.height / 2;
        this.addChild(winToCredit);
        winToCredit.touchEnabled = true;
        winToCredit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            winToCredit.scaleX = 0.6;
            winToCredit.scaleY = 0.6;
        }, this);
        winToCredit.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            winToCredit.scaleX = 0.5;
            winToCredit.scaleY = 0.5;
        }, this);
        winToCredit.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            winToCredit.scaleX = 0.5;
            winToCredit.scaleY = 0.5;
        }, this);
        winToCredit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //计算，将奖金池的值与筹码区的值想加，值赋予筹码区，并置空奖金区的值
            this.creditItem.credit_num = this.creditItem.credit_num + this.bonusWinItem.credit_num;
            this.bonusWinItem.credit_num = 0;
            //显示
            this.creditItem.credit_num_text.text = this.creditItem.credit_num + "";
            this.bonusWinItem.credit_num_text.text = this.bonusWinItem.credit_num + "";
        }, this);
        this.anchorOffsetX = this.width / 2;
        this.y = 10;
        this.x = this.parent.width / 2;
    };
    return Credit;
}(egret.DisplayObjectContainer));
__reflect(Credit.prototype, "Credit");
var CreditItem = (function (_super) {
    __extends(CreditItem, _super);
    function CreditItem(credit_num) {
        var _this = _super.call(this) || this;
        _this.credit_num = credit_num;
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
        this.credit_num_text = new egret.TextField();
        this.credit_num_text.text = this.credit_num + "";
        this.credit_num_text.height = this.height;
        this.credit_num_text.width = this.width - this.height;
        this.credit_num_text.anchorOffsetX = this.credit_num_text.width / 2;
        this.credit_num_text.anchorOffsetY = this.credit_num_text.height / 2;
        this.credit_num_text.x = this.width / 2;
        this.credit_num_text.y = this.height / 2;
        this.credit_num_text.size = this.height;
        this.credit_num_text.textColor = 0xffffff;
        this.credit_num_text.textAlign = egret.HorizontalAlign.CENTER;
        this.credit_num_text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.credit_num_text);
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
        this.scaleX = 1.1;
        this.scaleY = 1.1;
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
        this.scaleX = 1;
        this.scaleY = 1;
        this.icon.filters = [];
    };
    return FruitDiscIcon;
}(egret.DisplayObjectContainer));
__reflect(FruitDiscIcon.prototype, "FruitDiscIcon");
var FruitHistory = (function (_super) {
    __extends(FruitHistory, _super);
    function FruitHistory() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistory.prototype.render = function () {
        this.height = this.stage.stageHeight - 20;
        this.width = 35;
        // this.anchorOffsetY = this.height / 2;
        this.x = 10;
        this.y = 10;
        var history_header = new egret.Bitmap(RES.getRes("History_png"));
        history_header.width = 35;
        history_header.height = 35;
        this.addChild(history_header);
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xf0f0f0, 0.5);
        shape.graphics.drawRect(0, history_header.height, this.width, this.height - history_header.height);
        shape.graphics.endFill();
        this.addChild(shape);
        this.history_content = new FruitHistoryContent();
        this.addChild(this.history_content);
    };
    FruitHistory.prototype.addItem = function (item) {
        this.history_content.addItem(item);
    };
    return FruitHistory;
}(egret.DisplayObjectContainer));
__reflect(FruitHistory.prototype, "FruitHistory");
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
        bet.text = this.turn_number + ""; //翻倍数
        bet.textColor = 0x000000;
        bet.size = bet_item_header.height - 5;
        bet.width = this.width;
        bet.height = bet_item_header.height;
        bet.textAlign = egret.HorizontalAlign.CENTER;
        bet.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet);
        //中间图片
        this.bet_item_icon = new egret.Bitmap(RES.getRes(this.icon));
        this.bet_item_icon.width = this.height * 0.3;
        this.bet_item_icon.height = this.height * 0.3;
        this.bet_item_icon.anchorOffsetX = this.bet_item_icon.width / 2;
        this.bet_item_icon.x = this.width / 2;
        this.bet_item_icon.y = bet_item_header.height;
        this.addChild(this.bet_item_icon);
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.bet_item_icon.scaleX = 1.1;
            this.bet_item_icon.scaleY = 1.1;
        }, this);
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.bet_item_icon.scaleX = 1;
            this.bet_item_icon.scaleY = 1;
        }, this);
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.bet_item_icon.scaleX = 1;
            this.bet_item_icon.scaleY = 1;
        }, this);
        //押注数背景
        var bet_item_footer = new egret.Shape();
        bet_item_footer.graphics.beginFill(this.footer_color);
        bet_item_footer.graphics.lineStyle(1, 0x121212);
        bet_item_footer.graphics.drawRoundRect(0, 0, this.width, this.height * 0.45, 1);
        bet_item_footer.graphics.endFill();
        bet_item_footer.y = this.bet_item_icon.y + this.bet_item_icon.height;
        this.addChild(bet_item_footer);
        //点击押注数量
        this.bet_text_num = new egret.TextField();
        this.bet_text_num.text = this.bet_num + "";
        this.bet_text_num.textColor = 0xffffff;
        this.bet_text_num.size = bet_item_footer.width;
        this.bet_text_num.width = this.width;
        this.bet_text_num.height = bet_item_footer.height;
        this.bet_text_num.y = bet_item_footer.y;
        this.bet_text_num.textAlign = egret.HorizontalAlign.CENTER;
        this.bet_text_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.bet_text_num);
    };
    BetItem.prototype.giveVFX = function () {
        var color = 0xED3200; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.9; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
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
        this.filters = [glowFilter, colorFlilter];
    };
    //清空路径
    BetItem.prototype.clearVFX = function () {
        this.filters = [];
    };
    return BetItem;
}(egret.DisplayObjectContainer));
__reflect(BetItem.prototype, "BetItem");
var FruitHistoryItem = (function (_super) {
    __extends(FruitHistoryItem, _super);
    function FruitHistoryItem(icon) {
        var _this = _super.call(this) || this;
        _this.icon = icon;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistoryItem.prototype.render = function () {
        this.width = this.parent.width;
        this.height = this.width;
        this.y = (this.parent.numChildren - 1) * this.height;
        var item_bg = new egret.Shape();
        item_bg.graphics.beginFill(0xf0f0f0);
        item_bg.graphics.lineStyle(1, 0x6b6565);
        item_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        item_bg.graphics.endFill();
        this.addChild(item_bg);
        var item_icon = new egret.Bitmap(RES.getRes(this.icon));
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
        this.anchorOffsetY = this.height / 2;
        var main = this.parent;
        this.x = main.history.x + main.history.width + 10;
        this.y = this.stage.stageHeight / 2;
        var gameDiscShape = new egret.Shape();
        gameDiscShape.graphics.beginFill(0xf0f0f0, 0);
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
        // //圆盘中间内容
        this.gameDiscCenter = new GameDiscCenter();
        this.addChild(this.gameDiscCenter);
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
var GameDiscCenter = (function (_super) {
    __extends(GameDiscCenter, _super);
    function GameDiscCenter() {
        var _this = _super.call(this) || this;
        _this.text_num = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    GameDiscCenter.prototype.render = function () {
        this.height = this.parent.height - (((this.parent.height - 32) / 7 + 8) * 2);
        this.width = this.parent.width - (((this.parent.width - 32) / 7 + 8) * 2);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;
        var center = new egret.Shape();
        center.graphics.lineStyle(3, 0x262626);
        center.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        this.addChild(center);
        this.lamp1_red = new egret.Bitmap(RES.getRes("Lantern_Lamp_Red_png"));
        this.lamp1_red.anchorOffsetY = this.lamp1_red.height / 2;
        this.lamp1_red.x = 10;
        this.lamp1_red.y = this.height / 2;
        this.addChild(this.lamp1_red);
        this.lamp2_red = new egret.Bitmap(RES.getRes("Lantern_Lamp_Red_png"));
        this.lamp2_red.anchorOffsetY = this.lamp2_red.height / 2;
        this.lamp2_red.anchorOffsetX = this.lamp2_red.width;
        this.lamp2_red.x = this.width - 10;
        this.lamp2_red.y = this.height / 2;
        this.addChild(this.lamp2_red);
        this.lamp1_yellow = new egret.Bitmap(RES.getRes("Lantern_Lamp_Yellow_png"));
        this.lamp1_yellow.anchorOffsetY = this.lamp1_yellow.height / 2;
        this.lamp1_yellow.x = 10;
        this.lamp1_yellow.y = this.height / 2;
        this.addChild(this.lamp1_yellow);
        this.lamp2_yellow = new egret.Bitmap(RES.getRes("Lantern_Lamp_Yellow_png"));
        this.lamp2_yellow.anchorOffsetY = this.lamp2_yellow.height / 2;
        this.lamp2_yellow.anchorOffsetX = this.lamp2_yellow.width;
        this.lamp2_yellow.x = this.width - 10;
        this.lamp2_yellow.y = this.height / 2;
        this.addChild(this.lamp2_yellow);
        var lr_bg = new egret.Shape();
        lr_bg.graphics.beginFill(0x5D1D1D, 1);
        lr_bg.graphics.lineStyle(1, 0x121212);
        lr_bg.graphics.drawRect(0, 0, 30, 60);
        lr_bg.graphics.endFill();
        lr_bg.anchorOffsetX = lr_bg.width / 2;
        lr_bg.anchorOffsetY = lr_bg.height / 2;
        lr_bg.x = this.width / 2;
        lr_bg.y = this.height / 2;
        this.addChild(lr_bg);
        this.text_field = new egret.TextField();
        this.text_field.height = this.height;
        this.text_field.width = this.width;
        this.text_field.text = this.text_num + "";
        this.text_field.size = lr_bg.width;
        this.text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_field.textColor = 0xffffff;
        this.addChild(this.text_field);
    };
    GameDiscCenter.prototype.produceRandomNum = function () {
        var that = this;
        this.random_interval = setInterval(function () {
            that.text_num = Math.floor(Math.random() * 10);
            that.text_field.text = that.text_num + "";
        }, 200);
    };
    //停止产生随机数
    GameDiscCenter.prototype.stopProduceRanom = function () {
        clearInterval(this.random_interval);
    };
    //闪烁喜灯
    GameDiscCenter.prototype.twinkleLamp = function () {
        var that = this;
        this.twinkle_interval = setInterval(function () {
            that.swapChildren(that.lamp1_red, that.lamp1_yellow);
            that.swapChildren(that.lamp2_red, that.lamp2_yellow);
        }, 200);
    };
    //停止喜灯
    GameDiscCenter.prototype.stopTwinkleLamp = function () {
        clearInterval(this.twinkle_interval);
    };
    return GameDiscCenter;
}(egret.DisplayObjectContainer));
__reflect(GameDiscCenter.prototype, "GameDiscCenter");
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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.bgShape = new egret.Shape();
        this.bgShape.graphics.beginFill(0xf0f0f0, 1);
        this.bgShape.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.bgShape.graphics.endFill();
        this.addChild(this.bgShape);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.size = 20;
        this.textField.width = this.stage.stageWidth;
        this.textField.height = this.stage.stageHeight;
        this.textField.textColor = 0x0f0f0f;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
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
var bet_buffer = 0;
var ICON_COLOR = [0x1194A8, 0xD89A14, 0X589120];
var Fruit_Icons = ["Apple_png", "Watermelon_png", "Cocco_png", "Seven_png", "Chip_50_png", "Chip_100_png", "Banana_png", "Lime_png", "Arancia_png", "Strawberry_png", "Dice_png"];
var Fruit_Bet = [5, 20, 30, 40, 50, 100, 20, 15, 10, 2];
var Fruit_Header_Color = [0xFB459A, 0x92E02A, 0x92E02A, 0x92E02A, 0xFB459A, 0xFB459A, 0x92E02A, 0x92E02A, 0x92E02A, 0xFB459A];
var Fruit_Footer_Color = [0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d, 0x5d1d1d];
var Fruit_Excute_Order = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 23, 22, 21, 20, 19, 18, 17, 15, 13, 11, 9, 7];
var APP_RANK_BACK = "rank_back_png";
var APP_OPEN_ID_URL = "http://flow.go.gionee.com/wx/checkLogin.json";
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
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkUpdate();
                        this.shareGame();
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
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
        // //圆盘中间内容
        var center = new egret.Bitmap(RES.getRes("bg_jpg"));
        center.height = stageH;
        center.width = stageW;
        center.anchorOffsetX = center.width / 2;
        center.anchorOffsetY = center.height / 2;
        center.x = stageW / 2;
        center.y = stageH / 2;
        this.addChild(center);
        this.history = new FruitHistory();
        this.addChild(this.history);
        this.gameDisc = new GameDisc();
        this.addChild(this.gameDisc);
        this.rightPanel = new RightPanel();
        this.addChild(this.rightPanel);
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
    //冷启动更新游戏
    Main.prototype.checkUpdate = function () {
        if (typeof wx.getUpdateManager === 'function') {
            var updateManager_1 = wx.getUpdateManager();
            updateManager_1.onCheckForUpdate(function () {
                // 请求完新版本信息的回调
            });
            updateManager_1.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager_1.applyUpdate();
            });
            updateManager_1.onUpdateFailed(function () {
                // 新的版本下载失败
            });
        }
    };
    Main.prototype.shareGame = function () {
        //显示转发按钮
        wx.showShareMenu({
            withShareTicket: false,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
        //配置转发信息
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title: '犬夜叉之角色拼图',
                desc: '日本战国时代，主要讲述的是初三女生日暮戈薇偶然通过自家神社的食骨之井穿越时空来到500年前的日本战国时代妖怪与人的混血半妖——犬夜叉，为寻找散落于各处的四魂之玉碎片而展开的冒险之旅',
            };
        });
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
var RankBtn = (function (_super) {
    __extends(RankBtn, _super);
    function RankBtn(res) {
        var _this = _super.call(this, RES.getRes(res)) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RankBtn.prototype.render = function () {
        var parent = this.parent;
        this.anchorOffsetX = this.width;
        this.x = parent.width - 15;
        this.y = parent.betPanel2.y + parent.betPanel2.height + 2;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.scaleX = 1;
            this.scaleY = 1;
        }, this);
    };
    return RankBtn;
}(egret.Bitmap));
__reflect(RankBtn.prototype, "RankBtn");
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RankUI.prototype.render = function () {
        this.width = this.parent.width;
        this.height = this.parent.height;
        //处理遮罩，避免开放数据域事件影响主域。
        this.rankingListMask = new egret.Shape();
        this.rankingListMask.graphics.beginFill(0x686b72, 1);
        this.rankingListMask.graphics.drawRect(0, 1, this.width, this.height);
        this.rankingListMask.graphics.endFill();
        this.rankingListMask.alpha = 0.7;
        this.rankingListMask.touchEnabled = true;
        this.addChild(this.rankingListMask);
        // 将离屏的canvas生成图片，贴到主屏
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        this.bitmap = new egret.Bitmap(texture);
        this.bitmap.width = this.width;
        this.bitmap.height = this.height;
        this.bitmap.alpha = 0.8;
        this.addChild(this.bitmap);
        // 画一个返回的按钮
        this.btnClose = new egret.Bitmap(RES.getRes(APP_RANK_BACK));
        this.btnClose.height = 30;
        this.btnClose.width = 30;
        this.btnClose.anchorOffsetY = this.btnClose.height;
        this.btnClose.x = 10;
        this.btnClose.y = this.height - 2;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnClose);
        this.btnClose.touchEnabled = true;
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
    };
    return RankUI;
}(egret.DisplayObjectContainer));
__reflect(RankUI.prototype, "RankUI");
var RightPanel = (function (_super) {
    __extends(RightPanel, _super);
    function RightPanel() {
        var _this = _super.call(this) || this;
        _this.openDataContext = wx.getOpenDataContext();
        _this.i = 0;
        _this.j = 0;
        //处理跑马灯结束后对筹码以及奖金池的处理
        _this.bonus_win = 0;
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
        right_panel_bg.graphics.beginFill(0xf0f0f0, 0.0);
        // right_panel_bg.graphics.lineStyle(2,0x121212);
        right_panel_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);
        this.credit = new Credit();
        this.addChild(this.credit);
        this.betPanel1 = new BetPanel(0);
        this.addChild(this.betPanel1);
        this.betPanel2 = new BetPanel(1);
        this.addChild(this.betPanel2);
        this.bet_on_btn = new BetOnBtn("BET");
        this.addChild(this.bet_on_btn);
        this.bet_on_btn.x = 15;
        this.bet_on_btn.y = this.betPanel2.y + this.betPanel2.height + 2;
        //押注按钮的监听事件
        this.bet_on_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginBetOn, this);
        this.rankBtn = new RankBtn("Game_Rank_png");
        this.addChild(this.rankBtn);
        //排行按钮的监听事件
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createScoreRank, this);
        this.start_btn = new BetBtn("START");
        this.addChild(this.start_btn);
        this.start_btn.anchorOffsetX = this.start_btn.width / 2;
        this.start_btn.x = this.width / 2;
        this.start_btn.y = this.betPanel2.y + this.betPanel2.height + 5;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginStart, this);
        this.left_btn = new BetBtn("LEFT");
        this.addChild(this.left_btn);
        this.left_btn.anchorOffsetX = this.left_btn.width;
        this.left_btn.x = this.width / 2 - 5;
        this.left_btn.y = this.start_btn.y + this.start_btn.height + 5;
        this.left_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ifLittle, this);
        this.right_btn = new BetBtn("RIGHT");
        this.addChild(this.right_btn);
        this.right_btn.x = this.width / 2 + 5;
        this.right_btn.y = this.start_btn.y + this.start_btn.height + 5;
        this.right_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ifGreat, this);
        this.login1();
    };
    //处理押注按钮：1：可点击图片效果 2：图片可点击 3：清空之前押注的筹码 4：还原筹码区的筹码数
    RightPanel.prototype.beginBetOn = function () {
        //开始押注1:开始按钮可用 2：左右按钮不可用 3：游戏盘复原 4：停止闪烁
        this.start_btn.enableBtn();
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        var parent = this.parent;
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        //清空之前押注的内容
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach(function (item, index) {
            //图片可点击效果，放大图片
            //置为可点击
            item.bet_item_icon.touchEnabled = true;
            //清空筹码
            item.bet_num = 0;
            item.bet_text_num.text = item.bet_num + "";
            //清空滤镜
            item.filters = [];
        });
        //还原筹码区的筹码
        this.credit.creditItem.credit_num = this.credit.creditItem.credit_num + bet_buffer;
        this.credit.creditItem.credit_num_text.text = this.credit.creditItem.credit_num + "";
        //置空bet缓存
        bet_buffer = 0;
        //置空奖金
        this.bonus_win = 0;
    };
    //开始跑马灯
    RightPanel.prototype.beginStart = function () {
        //跑马灯过程中，将开始和押注按钮置为不可用,
        this.start_btn.disableBtn();
        this.bet_on_btn.disableBtn();
        //并复原图片按钮的大小，也置为不可用
        this.handleEndStart();
        //置空bet缓存
        bet_buffer = 0;
        var sure_value = Math.round(Math.random() * 650);
        var fruit_res = this.weatherFruit(sure_value);
        //开始应用跑马灯
        var count = 100 + Math.random() * 100;
        this.marquee(fruit_res, count);
    };
    //判断是否小
    RightPanel.prototype.ifLittle = function () {
        var parent = this.parent;
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        var num = parent.gameDisc.gameDiscCenter.text_num;
        if (num <= 4) {
            //判定成功，分数翻倍
            //更新奖金池中的信息
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        else {
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num - this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        //更新排行榜
        this.sendScoreToOpenContext();
    };
    //判断是否大
    RightPanel.prototype.ifGreat = function () {
        var parent = this.parent;
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        var num = parent.gameDisc.gameDiscCenter.text_num;
        if (num > 4) {
            //判定成功，分数翻倍
            //更新奖金池中的信息
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        else {
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num - this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        //更新排行榜
        this.sendScoreToOpenContext();
    };
    //跑马灯
    RightPanel.prototype.marquee = function (fruit_res, count) {
        this.j++;
        var that = this;
        this.i = this.i % 24;
        var parent = this.parent;
        var fruitDiscIcon = parent.gameDisc.fruitDiscIcons[Fruit_Excute_Order[this.i]];
        fruitDiscIcon.giveVFX();
        if (this.j > count) {
            if (fruitDiscIcon.icon_res == fruit_res) {
                this.i = 0;
                this.j = 0;
                this.handleSelectIcon(fruit_res);
                parent.history.addItem(new FruitHistoryItem(fruit_res));
                this.bet_on_btn.enableBtn(); //激活押注按钮
                return;
            }
        }
        //延迟调用
        setTimeout(function () {
            fruitDiscIcon.clearVFX();
            that.i++;
            that.marquee(fruit_res, count);
        }, 20);
    };
    //633判断为哪种水果
    RightPanel.prototype.weatherFruit = function (value) {
        var fruit;
        if (value > (900 - 6)) {
            fruit = Fruit_Icons[Fruit_ICON.Chip_100];
        }
        else if (value > (900 - 6 - 12)) {
            fruit = Fruit_Icons[Fruit_ICON.Chip_50];
        }
        else if (value > (900 - 6 - 12 - 15)) {
            fruit = Fruit_Icons[Fruit_ICON.Seven];
        }
        else if (value > (900 - 6 - 12 - 15 - 20)) {
            fruit = Fruit_Icons[Fruit_ICON.Cocco];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30)) {
            fruit = Fruit_Icons[Fruit_ICON.Watermelon];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30 - 120)) {
            fruit = Fruit_Icons[Fruit_ICON.Apple];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30 - 120 - 300)) {
            fruit = Fruit_Icons[Fruit_ICON.Strawberry];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60)) {
            fruit = Fruit_Icons[Fruit_ICON.Arancia];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60 - 40)) {
            fruit = Fruit_Icons[Fruit_ICON.Lime];
        }
        else if (value > (900 - 6 - 12 - 15 - 20 - 30 - 120 - 300 - 60 - 40 - 30)) {
            fruit = Fruit_Icons[Fruit_ICON.Banana];
        }
        else {
            fruit = Fruit_Icons[Fruit_ICON.Dice];
        }
        return fruit;
    };
    RightPanel.prototype.handleSelectIcon = function (fruit_res) {
        var _this = this;
        //对押注进行计算
        if (fruit_res == "Dice_png") {
            this.start_btn.enableBtn();
        }
        else {
            this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach(function (item, index) {
                if (item.icon == fruit_res) {
                    item.giveVFX();
                }
                if (item.icon == fruit_res && item.bet_num != 0) {
                    //说明押注成功。给予奖金,如果押注数是零，则不给于
                    _this.bonus_win = item.turn_number * item.bet_num;
                    //更新奖金池中的信息
                    _this.credit.bonusWinItem.credit_num = _this.credit.bonusWinItem.credit_num + _this.bonus_win;
                    _this.credit.bonusWinItem.credit_num_text.text = _this.credit.bonusWinItem.credit_num + "";
                    var parent_1 = _this.parent;
                    //押注成功则进行翻倍判断1：红灯闪烁 2：产生随机数 3：左右按钮可用
                    parent_1.gameDisc.gameDiscCenter.produceRandomNum();
                    parent_1.gameDisc.gameDiscCenter.twinkleLamp();
                    _this.left_btn.enableBtn();
                    _this.right_btn.enableBtn();
                }
            });
            //更新排行榜
            this.sendScoreToOpenContext();
        }
    };
    //BetPanel对开始按钮的响应处理，将图片复原，并不可点击
    RightPanel.prototype.handleEndStart = function () {
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach(function (item, index) {
            item.bet_item_icon.touchEnabled = false;
        });
    };
    //发送更新排行榜的信息
    RightPanel.prototype.sendScoreToOpenContext = function () {
        wx.setStorage({
            key: "dou_lamp_rank_score",
            data: this.credit.bonusWinItem.credit_num + this.credit.creditItem.credit_num + "",
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        });
        this.openDataContext.postMessage({
            update_score: true,
            score: this.credit.bonusWinItem.credit_num + this.credit.creditItem.credit_num
        });
    };
    //创建排名
    RightPanel.prototype.createScoreRank = function () {
        var _this = this;
        if (this.isdisplay) {
            this.removeChildAt(this.numChildren - 1);
            this.isdisplay = false;
        }
        else {
            this.checkSession().then(function () {
                _this.createScoreRankUI();
            }).catch(function () {
                _this.login();
            });
        }
    };
    //异步封装检查sessioni失效
    RightPanel.prototype.checkSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.checkSession({
                            success: function (res) {
                                resolve();
                            },
                            fail: function (res) {
                                reject;
                            },
                            complete: function (res) {
                            }
                        });
                    })];
            });
        });
    };
    //创建排行榜视图
    RightPanel.prototype.createScoreRankUI = function () {
        this.rankUi = new RankUI();
        this.addChild(this.rankUi);
        this.rankUi.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.isdisplay = true;
            this.createScoreRank();
        }, this);
        this.isdisplay = true;
        //发送消息
        this.openDataContext.postMessage({
            isDisplay: this.isdisplay,
            openid: this.openid
        });
    };
    //如果失效，则登录
    RightPanel.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loginInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        loginInfo = _a.sent();
                        this.openId(loginInfo.code).then(function () {
                            _this.createScoreRankUI();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //进入应用后进行登录
    RightPanel.prototype.login1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        loginInfo = _a.sent();
                        return [4 /*yield*/, this.openId(loginInfo.code)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //根据登录信息获取openid
    RightPanel.prototype.openId = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            //设置为 POST 请求
            var params = "?code=" + code;
            request.open(APP_OPEN_ID_URL + params, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                var response = JSON.parse(request.response);
                if (response.errcode) {
                    this.openid = "";
                }
                else {
                    this.openid = response.openid;
                }
                resolve();
            }, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                this.openid = "";
            }, _this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, function () {
                this.openid = "";
            }, _this);
        });
    };
    return RightPanel;
}(egret.DisplayObjectContainer));
__reflect(RightPanel.prototype, "RightPanel");
;window.Main = Main;