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
var APP_BEGIN_SCENE = "begin_scene";
var APP_BEGIN_GAME = "begin_game_png";
var APP_RANK_BACK = "rank_back_png";
var APP_RANK_VIEW = "rank_view_png";
var APP_EXIT_OUT = "exit_out_png";
var APP_REFRESH_VIEW = "refresh_view_png";
var CURRENT_STATION_CHARACTER_PRE = "character_";
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.index = 1;
        _this.openDataContext = wx.getOpenDataContext();
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
    //运行游戏
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginInfo, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkUpdate();
                        this.shareGame();
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createBeginScene()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        loginInfo = _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
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
    //创建开始场景
    Main.prototype.createBeginScene = function () {
        //标题以及背景，底部
        this.startingMain = new StartingMain();
        this.addChild(this.startingMain);
        this.startingMain.render();
        this.startingMain.touchEnabled = false;
        this.touchEnabled = false;
        //开始游戏监听
        this.startingMain.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.startingMain.startBtn.scaleX = 1.1;
            this.startingMain.startBtn.scaleY = 1.1;
            this.createGameScene();
        }, this);
        this.startingMain.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.startingMain.startBtn.scaleX = 1;
            this.startingMain.startBtn.scaleY = 1;
        }, this);
        this.startingMain.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.createScoreRank(); //关数排行
        }, this);
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        this.startingMain.btnRank.touchEnabled = false;
        //监听一个图像拼接完成事件
        this.gameMain = new GameMain(this.index);
        this.addChild(this.gameMain);
        this.gameMain.render();
        //图片监听
        this.gameMain.photo.addEventListener(CompleteEvent.Result, function (e) {
            console.log(e.steps);
            this.openDataContext.postMessage({
                update_step: true,
                cost_step: e.steps
            });
        }, this);
        //排行榜
        this.gameMain.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.createScoreRank();
        }, this);
        //刷新
        this.gameMain.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.removeChildren();
            this.index = Math.floor(Math.random() * 7 + 1);
            this.createGameScene();
        }, this);
    };
    //创建排名
    Main.prototype.createScoreRank = function () {
        //开放数据
        if (this.isdisplay) {
            this.removeChildAt(this.numChildren - 1);
            this.startingMain.btnRank.touchEnabled = true;
            this.isdisplay = false;
        }
        else {
            this.startingMain.btnRank.touchEnabled = false;
            this.rankUi = new RankUI();
            this.addChild(this.rankUi);
            this.rankUi.render();
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
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
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
