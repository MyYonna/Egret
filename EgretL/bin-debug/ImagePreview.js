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
var ImagePreview = (function (_super) {
    __extends(ImagePreview, _super);
    function ImagePreview(index, photo) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.photo = photo;
        return _this;
    }
    ImagePreview.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scale;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //加载图片
                    return [4 /*yield*/, RES.getResAsync(CURRENT_STATION_CHARACTER_PRE + this.index)];
                    case 1:
                        //加载图片
                        _a.sent();
                        this.preview_img = new egret.Bitmap(RES.getRes(CURRENT_STATION_CHARACTER_PRE + this.index));
                        scale = this.preview_img.width > this.preview_img.height ? this.preview_img.height / 75 : this.preview_img.width / 75;
                        this.preview_img.width = this.preview_img.width / scale;
                        this.preview_img.height = this.preview_img.height / scale;
                        //初始化这个图片容器的位置和宽高
                        this.width = this.preview_img.width;
                        this.height = this.preview_img.height;
                        this.anchorOffsetX = this.width / 2;
                        this.anchorOffsetY = this.height / 2;
                        this.x = this.stage.stageWidth / 2;
                        this.y = this.stage.stageHeight - 75;
                        this.addChild(this.preview_img);
                        //初始化图片的蒙版
                        this.circle = new egret.Shape();
                        this.circle.graphics.beginFill(0xffffff, 1);
                        this.circle.graphics.drawCircle(0, 0, 37.5);
                        this.circle.graphics.endFill();
                        this.circle.x = this.width / 2;
                        this.circle.y = this.height - 37.5;
                        this.preview_img.mask = this.circle;
                        this.addChild(this.circle);
                        //注册这个容器的监听
                        this.touchEnabled = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ImagePreview;
}(egret.DisplayObjectContainer));
__reflect(ImagePreview.prototype, "ImagePreview");
