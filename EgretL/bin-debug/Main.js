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
var APP_BG_COLOR = 0x87A09D; //小程序的背景颜色
var PF_BG_COLOR = 0xC7C7C7; //相框背景颜色
var PF_BR_COLOR = 0x0C0C0C; //相框边框
var PF_BR_WIDTH = 10;
var APP_NEXT_STATION = "next_station";
var APP_WAIT_STASTIC = "wait_stastic";
var CURRENT_STATION_CHARACTER_PRE = "character_";
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 创建游戏场景
         */
        _this.current_station_character_index = 1;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = function () { };
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
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    //加载资源文件和资源
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("icons", 1, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        //背景
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg = new egret.Sprite();
        bg.graphics.beginFill(APP_BG_COLOR, 1); //设置APP背景
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var that = this;
        var photoFrame = new PhotoFrame(bg);
        var photo = new Photo(photoFrame, CURRENT_STATION_CHARACTER_PRE + this.current_station_character_index);
        photo.addEventListener(CompleteEvent.Result, function () {
            that.touchEnabled = true;
            that.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.begin, that);
            that.addEventListener(egret.TouchEvent.TOUCH_END, that.end, that);
        }, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, that.begin, that);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, that.end, that);
    };
    //舞台的滑动执行内部方法
    Main.prototype.begin = function (evt) {
        this.startX = evt.localX;
    };
    Main.prototype.end = function (evt) {
        var moveXZ = evt.localX > this.startX ? true : false;
        if (evt.localX == this.startX || (moveXZ && this.current_station_character_index == 7) || (!moveXZ && this.current_station_character_index == 1)) {
            return;
        }
        if (moveXZ) {
            this.nextListener();
        }
        else {
            this.preListener();
        }
    };
    //重新开始
    Main.prototype.redoListener = function () {
        this.removeChildren();
        this.createGameScene();
    };
    //下一个
    Main.prototype.nextListener = function () {
        this.current_station_character_index++;
        this.removeChildren();
        this.createGameScene();
    };
    //下一个
    Main.prototype.preListener = function () {
        this.current_station_character_index--;
        this.removeChildren();
        this.createGameScene();
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
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
