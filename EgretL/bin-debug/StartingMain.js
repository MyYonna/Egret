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
var StartingMain = (function (_super) {
    __extends(StartingMain, _super);
    function StartingMain() {
        var _this = _super.call(this) || this;
        _this.startBtn = new StartBtn();
        _this.btnRank = new egret.Bitmap(RES.getRes(APP_RANK_VIEW));
        return _this;
    }
    StartingMain.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.width = this.stage.stageWidth;
                        this.height = this.stage.stageHeight;
                        //背景
                        this.begin_bg = new egret.Shape();
                        this.begin_bg.graphics.beginFill(0x8c8f98, 1);
                        this.begin_bg.graphics.drawRect(0, 0, this.width, this.height);
                        this.begin_bg.graphics.endFill();
                        this.addChild(this.begin_bg);
                        //开始标题
                        return [4 /*yield*/, RES.getResAsync("begin_title_png")];
                    case 1:
                        //开始标题
                        _a.sent();
                        this.begin_title = new egret.Bitmap(RES.getRes("begin_title_png"));
                        this.begin_title.height = this.begin_title.height * (300 / this.begin_title.width);
                        this.begin_title.width = 300;
                        this.begin_title.anchorOffsetX = this.begin_title.width / 2;
                        this.begin_title.anchorOffsetY = this.begin_title.height / 2;
                        this.begin_title.x = this.width / 2;
                        this.begin_title.y = this.height * 0.2;
                        this.addChild(this.begin_title);
                        //开始游戏
                        this.addChild(this.startBtn);
                        this.startBtn.touchEnabled = true;
                        this.startBtn.render();
                        //底部
                        this.end_bg = new egret.Shape();
                        this.end_bg.graphics.beginFill(0x727378, 1);
                        this.end_bg.graphics.drawRect(0, 0, this.width, 150);
                        this.end_bg.graphics.endFill();
                        this.end_bg.anchorOffsetY = this.end_bg.height;
                        this.end_bg.y = this.height;
                        this.addChild(this.end_bg);
                        //排行榜查看按钮
                        this.btnRank.anchorOffsetY = this.btnRank.height / 2;
                        this.btnRank.anchorOffsetX = this.btnRank.width / 2;
                        this.btnRank.x = 80;
                        this.btnRank.y = this.height - 75;
                        //简单实现，打开这关闭使用一个按钮。
                        this.addChild(this.btnRank);
                        this.btnRank.touchEnabled = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return StartingMain;
}(egret.DisplayObjectContainer));
__reflect(StartingMain.prototype, "StartingMain");
