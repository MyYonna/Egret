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
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var CompleteEvent = (function (_super) {
    __extends(CompleteEvent, _super);
    function CompleteEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    CompleteEvent.Result = "恭喜，过关成功。。";
    return CompleteEvent;
}(egret.Event));
__reflect(CompleteEvent.prototype, "CompleteEvent");
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
var APP_BG_COLOR = 0x87A09D; //小程序的背景颜色
var PF_BG_COLOR = 0xC7C7C7; //相框背景颜色
var PF_BR_COLOR = 0x0C0C0C; //相框边框
var PF_BR_WIDTH = 10;
var APP_NEXT_STATION = "next_station";
var APP_WAIT_STASTIC = "wait_stastic";
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
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
                        this.startAnimation(result);
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
                        _a.trys.push([0, 5, , 6]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("icons", 0, loadingView)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 4:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
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
        var photoFrame = new PhotoFrame(bg);
        var photo = new Photo(photoFrame);
        photo.addEventListener(CompleteEvent.Result, this.CompleteStation, this);
        this.textfield = new egret.TextField();
        this.addChild(this.textfield);
    };
    //拼图完成后，接收事件，并进行处理
    Main.prototype.CompleteStation = function (evt) {
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg = new egret.Sprite();
        bg.graphics.beginFill(APP_BG_COLOR, 0.6); //设置APP背景
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var wait_panel = new eui.Panel();
        wait_panel.title = "破关";
        wait_panel.horizontalCenter = 0;
        wait_panel.verticalCenter = 0;
        wait_panel.elementsContent = [];
        this.addChild(wait_panel);
        var contentArea = new eui.Group();
        var wait_stastic = this.createBitmapByName(APP_WAIT_STASTIC);
        var ratio = (wait_panel.width) / wait_stastic.width;
        wait_stastic.scaleX = ratio;
        wait_stastic.scaleY = ratio;
        wait_stastic.x = 0;
        wait_stastic.y = 0;
        contentArea.addChild(wait_stastic);
        var next_button = new eui.Button();
        next_button.label = "下一关";
        next_button.width = 100;
        next_button.x = wait_panel.width - next_button.width;
        next_button.y = wait_stastic.height * ratio;
        console.log(wait_panel.width - next_button.width, wait_stastic.height * ratio);
        contentArea.layout = new eui.BasicLayout();
        contentArea.width = wait_panel.width;
        contentArea.height = next_button.height + wait_stastic.height * ratio + wait_panel.moveArea.height;
        contentArea.x = 0;
        contentArea.y = wait_panel.moveArea.height;
        contentArea.addChild(next_button);
        wait_panel.elementsContent = [contentArea];
        //添加一个下一关的按钮，并注册监听
        var next_station = this.createBitmapByName(APP_NEXT_STATION);
        next_station.scaleX = 0.1;
        next_station.scaleY = 0.1;
        next_station.x = stageWidth - (next_station.width * next_station.scaleX + 50);
        next_station.y = stageHeight - (next_station.height * next_station.scaleY + 50);
        next_station.touchEnabled = true;
        next_station.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            next_station.scaleX = 0.15;
            next_station.scaleY = 0.15;
            next_station.x = stageWidth - (next_station.width * next_station.scaleX + 50);
            next_station.y = stageHeight - (next_station.height * next_station.scaleY + 50);
        }, this);
        next_station.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            next_station.scaleX = 0.1;
            next_station.scaleY = 0.1;
            next_station.x = stageWidth - (next_station.width * next_station.scaleX + 50);
            next_station.y = stageHeight - (next_station.height * next_station.scaleY + 50);
        }, this);
        bg.addChild(next_station);
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
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var Photo = (function (_super) {
    __extends(Photo, _super);
    function Photo(stage) {
        var _this = _super.call(this) || this;
        //将文件划分成4*4的矩阵
        _this.sub_imgs = [];
        _this.origin_sub_rects = [];
        _this.sub_rects = [];
        //鼠标按下,使目标图像处于最高深度，得到鼠标按下的位置与图像的起始位置的偏移
        _this._touchStatus = false;
        _this._distance = new egret.Point();
        _this.container = stage;
        _this.drawPhoto();
        return _this;
    }
    Photo.prototype.drawPhoto = function () {
        //加载图片
        this.pimg = new egret.Bitmap(RES.getRes("JieGeng"));
        var scale = (this.container.width - 40) / this.pimg.width;
        //为整张图片适配预定义的相框，得到缩放比
        this.pimg.width = this.pimg.width * scale;
        this.pimg.height = this.pimg.height * scale;
        this.pimg.anchorOffsetX = this.pimg.width / 2;
        this.pimg.anchorOffsetY = this.pimg.height / 2;
        this.pimg.x = (this.container.width) / 2;
        this.pimg.y = (this.container.height) / 2;
        this.container.addChild(this.pimg);
        // jieGeng.scale9Grid = new egret.Rectangle( 20,20,jieGengW,jieGengH );
        //为图片加上touch事件
        this.pimg.touchEnabled = true;
        this.pimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imageTouchListener, this);
    };
    Photo.prototype.imageTouchListener = function (evt) {
        //将文件资源进行等分
        var target = evt.currentTarget;
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentSrc1 = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",
            "uniform vec2 center;",
            "uniform vec3 params;",
            "uniform float time;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float dist = distance(uv, center);",
            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");
        var customFilter1 = new egret.CustomFilter(vertexSrc, fragmentSrc1, {
            center: { x: evt.localX / target.width, y: evt.localY / target.height },
            params: { x: 10, y: 0.8, z: 0.1 },
            time: 0
        });
        var that = this;
        target.filters = [customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            customFilter1.uniforms.time += 0.02;
            if (customFilter1.uniforms.time > 1) {
                // customFilter1.uniforms.time = 0.0;
                //帧播放完成后则拆分图像
                if (target.parent) {
                    that.container.removeChild(target);
                    that.divideImgRes(target);
                }
            }
        }, this);
    };
    Photo.prototype.divideImgRes = function (img) {
        var dImgW = img.width / 4;
        var dImgH = img.height / 4;
        var _distanceX = (this.container.width - img.width) / 2;
        var _distanceY = (this.container.height - img.height) / 2;
        this.main_rect = new egret.Rectangle(_distanceX, _distanceY, this.pimg.width + 2 * 4, this.pimg.height + 2 * 4);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //将最后的一张图片不显示
                if (i == 3 && j == 3) {
                    break;
                }
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(img, new egret.Rectangle(i * dImgW, j * dImgH, dImgW, dImgH));
                var sub_img = new egret.Bitmap(renderTexture);
                sub_img.x = _distanceX + (i * (dImgW + 2));
                sub_img.y = _distanceY + (j * (dImgH + 2));
                this.container.addChild(sub_img);
                //为图片添加鼠标事件
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                //将图片的包围盒保存起来，用于后期做碰撞检测
                var sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                var origin_sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
                this.origin_sub_rects.push(origin_sub_rect);
            }
        }
        //如果只放在小图片上加touch结束监听，则在空白地方无法触发
        this.container.touchEnabled = true;
        //  this.exchangeMoveSubImg(0);
    };
    Photo.prototype.mouseDown = function (evt) {
        this.target = evt.currentTarget;
        this.container.setChildIndex(this.target, this.container.numChildren - 1);
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.target.x;
        this._distance.y = evt.stageY - this.target.y;
        this.container.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    };
    //移动鼠标
    Photo.prototype.mouseMove = function (evt) {
    };
    //鼠标弹起
    Photo.prototype.mouseUp = function (evt) {
        this.container.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        var target = this.target;
        var moveY = evt.stageY;
        var moveX = evt.stageX;
        var ifX = false; //是否是水平移动
        var moveDistance = 0;
        //需要判断是哪个轴的移动
        if (this._touchStatus) {
            if (Math.abs(moveY - (this._distance.y + target.y)) > Math.abs(moveX - (this._distance.x + target.x))) {
                ifX = false;
                if ((moveY - (this._distance.y + target.y)) > 0) {
                    //说明是往Y正方向移动
                    moveDistance = this.pimg.height / 4 + 2;
                }
                else {
                    //说明是往Y负方向移动
                    moveDistance = -(this.pimg.height / 4 + 2);
                }
            }
            else if (Math.abs(moveY - (this._distance.y + target.y)) < Math.abs(moveX - (this._distance.x + target.x))) {
                if ((moveX - (this._distance.x + target.x)) > 0) {
                    //说明是往X正方向移动
                    moveDistance = this.pimg.width / 4 + 2;
                }
                else {
                    //说明是往X负方向移动
                    moveDistance = -(this.pimg.width / 4 + 2);
                }
                ifX = true;
            }
            else {
                this._touchStatus = false;
                return;
            }
            //新建一个移动后的包围盒，并与除自身以外的其他已存在包围盒进行碰撞检测
            var sourceRect;
            var targetRect;
            var targetIndex;
            if (ifX) {
                targetRect = new egret.Rectangle(target.x + moveDistance, target.y, target.width, target.height);
                for (var i = 0; i < this.sub_imgs.length; i++) {
                    if (this.sub_imgs[i] != target) {
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            //如果存在碰撞则返回，不执行下面的状态更新代码
                            return;
                        }
                    }
                    else {
                        targetIndex = i; //获得当前目标的包围盒索引
                    }
                }
                //更新当前目标的包围盒的坐标与目标坐标匹配
                this.sub_rects[targetIndex].x = this.sub_rects[targetIndex].x + moveDistance;
                egret.Tween.get(target).to({ x: target.x + moveDistance }, 500); //建立一个坐标移动的动画
                // egret.Tween.get(this.sub_rects[targetIndex]).to({ x:this.sub_rects[targetIndex].x + moveDistance}, 500); //建立一个坐标移动的动画
                //target.x = target.x + moveDistance;//更新目标坐标
            }
            else {
                targetRect = new egret.Rectangle(target.x, target.y + moveDistance, target.width, target.height);
                for (var i = 0; i < this.sub_imgs.length; i++) {
                    if (this.sub_imgs[i] != target) {
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            return;
                        }
                    }
                    else {
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].y = this.sub_rects[targetIndex].y + moveDistance;
                egret.Tween.get(target).to({ y: target.y + moveDistance }, 500);
                // egret.Tween.get(this.sub_rects[targetIndex]).to({ y:this.sub_rects[targetIndex].y + moveDistance}, 500); 
                //target.y = target.y + moveDistance;
            }
            if (this.ifFinishExchange(this.sub_rects, this.origin_sub_rects)) {
                console.log("拼图完成，进入下一阶段");
                var that = this;
                setTimeout(function () {
                    var completeEvent = new CompleteEvent(CompleteEvent.Result);
                    //发送要求事件
                    that.dispatchEvent(completeEvent);
                }, 500);
            }
        }
        this._touchStatus = false;
    };
    Photo.prototype.checkHit = function (targetRect, sourceRect) {
        return targetRect.intersects(sourceRect) || !this.main_rect.containsRect(targetRect);
    };
    /**
     * 交换已存在的img及其包围盒，已达到打乱顺序的目的
     */
    Photo.prototype.exchangeMoveSubImg = function (i) {
        var targetIndex = Math.floor(Math.random() * 15);
        var bridgeX, bridgeY;
        bridgeX = this.sub_imgs[i].x;
        bridgeY = this.sub_imgs[i].y;
        this.container.setChildIndex(this.sub_imgs[i], this.container.numChildren);
        egret.Tween.get(this.sub_imgs[i]).to({ x: this.sub_imgs[targetIndex].x, y: this.sub_imgs[targetIndex].y }, 500);
        this.container.setChildIndex(this.sub_imgs[targetIndex], this.container.numChildren);
        egret.Tween.get(this.sub_imgs[targetIndex]).to({ x: bridgeX, y: bridgeY }, 500);
        this.sub_rects[i].x = this.sub_rects[targetIndex].x;
        this.sub_rects[i].y = this.sub_rects[targetIndex].y;
        this.sub_rects[targetIndex].x = bridgeX;
        this.sub_rects[targetIndex].y = bridgeY;
        var that = this;
        if (i < 14) {
            setTimeout(function () {
                that.exchangeMoveSubImg(++i);
            }, 500);
        }
    };
    /**
     * 判断图像是否完全复位
     */
    Photo.prototype.ifFinishExchange = function (sub_rects, origin_sub_rects) {
        for (var i = 0; i < sub_rects.length; i++) {
            if (sub_rects[i].x != origin_sub_rects[i].x || sub_rects[i].y != origin_sub_rects[i].y) {
                return false;
            }
        }
        return true;
    };
    return Photo;
}(egret.Sprite));
__reflect(Photo.prototype, "Photo");
var PhotoFrame = (function (_super) {
    __extends(PhotoFrame, _super);
    function PhotoFrame(stage) {
        var _this = _super.call(this) || this;
        _this.container = stage;
        _this.drawPhotoFrame();
        return _this;
    }
    PhotoFrame.prototype.drawPhotoFrame = function () {
        var stageWidth = this.container.width;
        var stageHeight = this.container.height;
        var photoFrameW = stageWidth - 100;
        var photoFrameH = photoFrameW;
        this.graphics.beginFill(PF_BG_COLOR, 1); //设置相框背景
        //重新设置锚点
        this.anchorOffsetX = photoFrameW / 2;
        this.anchorOffsetY = photoFrameH / 2;
        this.graphics.lineStyle(PF_BR_WIDTH, PF_BR_COLOR); //设置相框的边框
        this.graphics.drawRect(0, 0, photoFrameW, photoFrameH);
        this.graphics.endFill();
        this.width = photoFrameW;
        this.height = photoFrameH;
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        this.container.addChild(this);
    };
    return PhotoFrame;
}(egret.Sprite));
__reflect(PhotoFrame.prototype, "PhotoFrame");
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
var RectInfo = (function () {
    function RectInfo(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return RectInfo;
}());
__reflect(RectInfo.prototype, "RectInfo");
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
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.bin", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                onResGet(data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_BIN);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
;window.Main = Main;