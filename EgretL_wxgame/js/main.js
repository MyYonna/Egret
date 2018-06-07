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
var CompleteEvent = (function (_super) {
    __extends(CompleteEvent, _super);
    function CompleteEvent(type, steps, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.steps = steps;
        return _this;
    }
    CompleteEvent.Result = "COMPLETE";
    return CompleteEvent;
}(egret.Event));
__reflect(CompleteEvent.prototype, "CompleteEvent");
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        return _this;
    }
    GameMain.prototype.render = function () {
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(APP_BG_COLOR, 1); //设置APP背景
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        //相框
        this.photoFrame = new PhotoFrame();
        this.addChild(this.photoFrame);
        this.photoFrame.render();
        //相片
        this.photo = new Photo(CURRENT_STATION_CHARACTER_PRE + this.index);
        this.photoFrame.addChild(this.photo);
        this.photo.render();
        //退出小程序
        this.exitBtn = new ExitBtn(RES.getRes(APP_EXIT_OUT));
        this.addChild(this.exitBtn);
        this.exitBtn.render();
        //预览按钮
        this.imgPre = new ImagePreview(this.index, this.photo);
        this.addChild(this.imgPre);
        this.imgPre.render();
        this.imgPre.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginPreviewImage, this);
        this.imgPre.addEventListener(egret.TouchEvent.TOUCH_END, this.endPreviewImage, this);
        //排行榜
        this.btnRank = new RankBtn(RES.getRes(APP_RANK_VIEW));
        this.addChild(this.btnRank);
        this.btnRank.render();
        //重新开始
        this.refreshBtn = new RefreshBtn(RES.getRes(APP_REFRESH_VIEW));
        this.addChild(this.refreshBtn);
        this.refreshBtn.render();
    };
    //弹起的监听事件
    GameMain.prototype.endPreviewImage = function (event) {
        var imgPre = event.currentTarget;
        imgPre.scaleX = 1;
        imgPre.scaleY = 1;
        this.photo.removeChildAt(this.photo.numChildren - 1);
    };
    //按下去的监听事件
    GameMain.prototype.beginPreviewImage = function (event) {
        var imgPre = event.currentTarget;
        imgPre.scaleX = 1.1;
        imgPre.scaleY = 1.1;
        var complete_img = new egret.Bitmap(RES.getRes(CURRENT_STATION_CHARACTER_PRE + this.index));
        var scale = complete_img.width > complete_img.height ? (this.photo.width) / complete_img.width : (this.photo.height) / complete_img.height;
        //为整张图片适配预定义的相框，得到缩放比
        complete_img.width = complete_img.width * scale;
        complete_img.height = complete_img.height * scale;
        complete_img.anchorOffsetX = complete_img.width / 2;
        complete_img.anchorOffsetY = complete_img.height / 2;
        complete_img.x = (this.photo.width) / 2;
        complete_img.y = (this.photo.height) / 2;
        this.photo.addChild(complete_img);
    };
    return GameMain;
}(egret.DisplayObjectContainer));
__reflect(GameMain.prototype, "GameMain");
var HomeBtn = (function (_super) {
    __extends(HomeBtn, _super);
    function HomeBtn() {
        return _super.call(this) || this;
    }
    HomeBtn.prototype.render = function () {
        var homeBtn = new egret.Bitmap(RES.getRes("page_home_png"));
        this.addChild(homeBtn);
        this.x = 30;
        this.y = this.stage.stageHeight - 30 - homeBtn.height;
        this.touchEnabled = true;
    };
    return HomeBtn;
}(egret.DisplayObjectContainer));
__reflect(HomeBtn.prototype, "HomeBtn");
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
var ExitBtn = (function (_super) {
    __extends(ExitBtn, _super);
    function ExitBtn(res) {
        return _super.call(this, res) || this;
    }
    ExitBtn.prototype.render = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = 30;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.exitMiniProgram({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }, this);
    };
    return ExitBtn;
}(egret.Bitmap));
__reflect(ExitBtn.prototype, "ExitBtn");
var PhotoFrame = (function (_super) {
    __extends(PhotoFrame, _super);
    function PhotoFrame() {
        return _super.call(this) || this;
    }
    PhotoFrame.prototype.render = function () {
        //设置本容器的属性
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var photoFrameW = stageWidth - 100;
        var photoFrameH = photoFrameW;
        this.width = photoFrameW;
        this.height = photoFrameH;
        //重新设置锚点
        this.anchorOffsetX = photoFrameW / 2;
        this.anchorOffsetY = photoFrameH / 2;
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        //为本容器加入背景组件
        var photoFrameBg = new egret.Shape();
        photoFrameBg.graphics.beginFill(PF_BG_COLOR, 1); //设置相框背景
        photoFrameBg.graphics.lineStyle(PF_BR_WIDTH, PF_BR_COLOR); //设置相框的边框
        photoFrameBg.graphics.drawRect(0, 0, photoFrameW, photoFrameH);
        photoFrameBg.graphics.endFill();
        this.addChild(photoFrameBg);
    };
    return PhotoFrame;
}(egret.DisplayObjectContainer));
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
var RankBtn = (function (_super) {
    __extends(RankBtn, _super);
    function RankBtn(res) {
        return _super.call(this, res) || this;
    }
    RankBtn.prototype.render = function () {
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.height - 75;
        this.touchEnabled = true;
    };
    return RankBtn;
}(egret.Bitmap));
__reflect(RankBtn.prototype, "RankBtn");
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        return _super.call(this) || this;
    }
    RankUI.prototype.render = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        //处理遮罩，避免开放数据域事件影响主域。
        this.rankingListMask = new egret.Shape();
        this.rankingListMask.graphics.beginFill(0x686b72, 1);
        this.rankingListMask.graphics.drawRect(0, 1, this.width, this.height);
        this.rankingListMask.graphics.endFill();
        this.rankingListMask.alpha = 0.7;
        this.rankingListMask.touchEnabled = true;
        this.addChild(this.rankingListMask);
        this.rankingButtomMask = new egret.Shape();
        this.rankingButtomMask.graphics.beginFill(0x686b72, 1);
        this.rankingButtomMask.graphics.drawRect(0, 1, this.width, 150);
        this.rankingButtomMask.graphics.endFill();
        this.rankingButtomMask.anchorOffsetY = this.rankingButtomMask.height;
        this.rankingButtomMask.y = this.height;
        this.addChild(this.rankingButtomMask);
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
        this.btnClose.height = 80;
        this.btnClose.width = 80;
        this.btnClose.anchorOffsetY = this.btnClose.height / 2;
        this.btnClose.anchorOffsetX = this.btnClose.width / 2;
        this.btnClose.x = 80;
        this.btnClose.y = this.height - 75;
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
var RefreshBtn = (function (_super) {
    __extends(RefreshBtn, _super);
    function RefreshBtn(res) {
        return _super.call(this, res) || this;
    }
    RefreshBtn.prototype.render = function () {
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetX = this.width;
        this.x = this.stage.width - 100;
        this.y = this.stage.height - 75;
        this.touchEnabled = true;
    };
    return RefreshBtn;
}(egret.Bitmap));
__reflect(RefreshBtn.prototype, "RefreshBtn");
var StartBtn = (function (_super) {
    __extends(StartBtn, _super);
    function StartBtn() {
        return _super.call(this) || this;
    }
    StartBtn.prototype.render = function () {
        //背景
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xf44133, 1);
        bgShape.graphics.drawRoundRect(0, 0, 300, 80, 80, 80);
        bgShape.graphics.endFill();
        this.addChild(bgShape);
        //头部图片
        var startBtnImg = new egret.Bitmap(RES.getRes("start_game_png"));
        startBtnImg.x = 20;
        startBtnImg.anchorOffsetY = startBtnImg.height / 2;
        startBtnImg.y = 40;
        this.addChild(startBtnImg);
        //文字
        var label = new egret.TextField();
        label.text = "开始游戏";
        label.textColor = 0xffffff;
        label.fontFamily = "KaiTi";
        label.size = 40;
        label.bold = true;
        label.italic = true;
        label.height = 80;
        label.x = startBtnImg.width + 10;
        // label.width = 160;
        // label.textAlign = egret.HorizontalAlign.LEFT;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(label);
        //位置
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight * 0.7;
        this.touchEnabled = true;
    };
    return StartBtn;
}(egret.DisplayObjectContainer));
__reflect(StartBtn.prototype, "StartBtn");
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
;window.Main = Main;