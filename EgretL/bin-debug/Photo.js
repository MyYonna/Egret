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
var Photo = (function (_super) {
    __extends(Photo, _super);
    function Photo(res) {
        var _this = _super.call(this) || this;
        //将文件划分成4*4的矩阵
        _this.sub_imgs = [];
        _this.origin_sub_rects = [];
        _this.sub_rects = [];
        //鼠标按下,使目标图像处于最高深度，得到鼠标按下的位置与图像的起始位置的偏移
        _this._touchStatus = false;
        _this._distance = new egret.Point();
        _this.steps = 0;
        _this.res = res;
        return _this;
    }
    Photo.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scale, photoBg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //加载图片
                    return [4 /*yield*/, RES.getResAsync(this.res)];
                    case 1:
                        //加载图片
                        _a.sent();
                        this.pimg = new egret.Bitmap(RES.getRes(this.res));
                        scale = this.pimg.width > this.pimg.height ? (this.parent.width - 40) / this.pimg.width : (this.parent.height - 40) / this.pimg.height;
                        //为整张图片适配预定义的相框，得到缩放比
                        this.pimg.width = this.pimg.width * scale;
                        this.pimg.height = this.pimg.height * scale;
                        //设置本容器的属性
                        this.width = this.pimg.width;
                        this.height = this.pimg.height;
                        //重新设置锚点
                        this.anchorOffsetX = this.width / 2;
                        this.anchorOffsetY = this.height / 2;
                        this.x = this.parent.width / 2;
                        this.y = this.parent.height / 2;
                        photoBg = new egret.Shape();
                        photoBg.graphics.beginFill(0xffffff, 1); //设置相框背景
                        photoBg.graphics.lineStyle(1, PF_BR_COLOR); //设置相框的边框
                        photoBg.graphics.drawRect(0, 0, this.width, this.height);
                        photoBg.graphics.endFill();
                        this.addChild(photoBg);
                        this.addChild(this.pimg);
                        //为图片加上touch事件
                        this.pimg.touchEnabled = true;
                        this.pimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imageTouchListener, this);
                        //步数显示
                        this.stepsField = new egret.TextField();
                        this.stepsField.text = this.steps + "";
                        this.stepsField.size = 50;
                        this.stepsField.textColor = 0x000000;
                        this.stepsField.x = 50;
                        this.stepsField.y = 100;
                        this.parent.parent.addChild(this.stepsField);
                        return [2 /*return*/];
                }
            });
        });
    };
    Photo.prototype.imageTouchListener = function (evt) {
        var _this = this;
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
            if (customFilter1.uniforms.time > 0.5) {
                // customFilter1.uniforms.time = 0.0;
                //帧播放完成后则拆分图像
                if (target.parent) {
                    target.parent.removeChild(target);
                    _this.divideImgRes(target);
                }
            }
        }, this);
    };
    Photo.prototype.divideImgRes = function (img) {
        this.resetPhoto(true);
        var dImgW = img.width / 4;
        var dImgH = img.height / 4;
        this.main_rect = new egret.Rectangle(0, 0, this.width, this.height); //对移动的外围进行限定
        var random_i = Math.floor(Math.random() * 4);
        var random_j = Math.floor(Math.random() * 4);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //将最后的一张图片不显示
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(img, new egret.Rectangle(i * dImgW, j * dImgH, dImgW, dImgH));
                var sub_img = new egret.Bitmap(renderTexture);
                sub_img.x = i * (dImgW + 2);
                sub_img.y = j * (dImgH + 2);
                //将图片的包围盒保存起来，用于后期做碰撞检测
                if (i == random_i && j == random_j) {
                    this.sub_rects.push(null);
                    this.sub_imgs.push(sub_img);
                    this.origin_sub_rects.push(null);
                    continue;
                }
                this.addChild(sub_img);
                var sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                var origin_sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
                this.origin_sub_rects.push(origin_sub_rect);
                //为图片添加鼠标事件
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            }
        }
        //如果只放在小图片上加touch结束监听，则在空白地方无法触发
        this.touchEnabled = true;
        //  this.exchangeMoveSubImg(0);
    };
    Photo.prototype.mouseDown = function (evt) {
        this.target = evt.currentTarget;
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.x - this.target.x;
        this._distance.y = evt.stageY - this.y - this.target.y;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    };
    //鼠标弹起
    Photo.prototype.mouseUp = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        var target = this.target;
        var moveY = evt.stageY;
        var moveX = evt.stageX;
        var ifX = false; //是否是水平移动
        var moveDistance = 0;
        //需要判断是哪个轴的移动
        if (this._touchStatus) {
            if (Math.abs(moveY - (this._distance.y + target.y + this.y)) > Math.abs(moveX - (this._distance.x + target.x + this.x))) {
                ifX = false;
                if ((moveY - (this._distance.y + target.y + this.y)) > 0) {
                    //说明是往Y正方向移动
                    moveDistance = this.pimg.height / 4 + 2;
                }
                else {
                    //说明是往Y负方向移动
                    moveDistance = -(this.pimg.height / 4 + 2);
                }
            }
            else if (Math.abs(moveY - (this._distance.y + target.y + this.y)) < Math.abs(moveX - (this._distance.x + target.x + this.x))) {
                if ((moveX - (this._distance.x + target.x + this.x)) > 0) {
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
            this.steps++;
            if (ifX) {
                targetRect = new egret.Rectangle(target.x + moveDistance, target.y, target.width, target.height);
                for (var i = 0; i < this.sub_imgs.length; i++) {
                    if (this.sub_imgs[i] != target) {
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            //如果存在碰撞则返回，不执行下面的状态更新代码
                            this.steps--;
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
            }
            else {
                targetRect = new egret.Rectangle(target.x, target.y + moveDistance, target.width, target.height);
                for (var i = 0; i < this.sub_imgs.length; i++) {
                    if (this.sub_imgs[i] != target) {
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            this.steps--;
                            return;
                        }
                    }
                    else {
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].y = this.sub_rects[targetIndex].y + moveDistance;
                egret.Tween.get(target).to({ y: target.y + moveDistance }, 500);
            }
            this.stepsField.text = this.steps + ""; //步数加1
            if (this.ifFinishExchange(this.sub_rects, this.origin_sub_rects)) {
                var that = this;
                setTimeout(function () {
                    that.resetPhoto(false);
                    var completeEvent = new CompleteEvent(CompleteEvent.Result, that.steps);
                    //将图片的位置向左挪动，形成一张完整的大图。。。
                    for (var i_1 = 0; i_1 < that.sub_imgs.length; i_1++) {
                        var t = Math.floor(i_1 / 4);
                        var j = i_1 % 4;
                        that.sub_imgs[i_1].touchEnabled = false;
                        ;
                        if (!that.sub_imgs[i_1].parent) {
                            that.addChild(that.sub_imgs[i_1]);
                        }
                        egret.Tween.get(that.sub_imgs[i_1]).to({ y: that.sub_imgs[i_1].y - 2 * j, x: that.sub_imgs[i_1].x - 2 * t }, 500);
                    }
                    //发送要求事件
                    that.dispatchEvent(completeEvent);
                }, 500);
            }
        }
        this._touchStatus = false;
    };
    //碰撞检测
    Photo.prototype.checkHit = function (targetRect, sourceRect) {
        if (targetRect != null && sourceRect != null) {
            return targetRect.intersects(sourceRect) || !this.main_rect.containsRect(targetRect);
        }
        return false;
    };
    //重置容器属性
    Photo.prototype.resetPhoto = function (flag) {
        //重新设置本容器的属性
        this.width = flag ? this.pimg.width + 2 * 3 : this.pimg.width;
        this.height = flag ? this.pimg.height + 2 * 3 : this.pimg.height;
        //重新重新设置锚点
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;
        //重新设置相片边界
        this.removeChildAt(0);
        var photoBg = new egret.Shape();
        photoBg.graphics.beginFill(0xffffff, 1); //设置相框背景
        photoBg.graphics.lineStyle(1, PF_BR_COLOR); //设置相框的边框
        photoBg.graphics.drawRect(0, 0, this.width, this.height);
        photoBg.graphics.endFill();
        this.addChild(photoBg);
        this.setChildIndex(photoBg, 0);
    };
    /**
     * 交换已存在的img及其包围盒，已达到打乱顺序的目的
     */
    Photo.prototype.exchangeMoveSubImg = function (i) {
        var targetIndex = Math.floor(Math.random() * 15);
        var bridgeX, bridgeY;
        bridgeX = this.sub_imgs[i].x;
        bridgeY = this.sub_imgs[i].y;
        this.parent.setChildIndex(this.sub_imgs[i], this.parent.numChildren);
        egret.Tween.get(this.sub_imgs[i]).to({ x: this.sub_imgs[targetIndex].x, y: this.sub_imgs[targetIndex].y }, 500);
        this.parent.setChildIndex(this.sub_imgs[targetIndex], this.parent.numChildren);
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
            if (sub_rects[i] != null && origin_sub_rects[i] != null) {
                if (sub_rects[i].x != origin_sub_rects[i].x || sub_rects[i].y != origin_sub_rects[i].y) {
                    return false;
                }
            }
        }
        return true;
    };
    return Photo;
}(egret.DisplayObjectContainer));
__reflect(Photo.prototype, "Photo");
