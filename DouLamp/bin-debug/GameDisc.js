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
var GameDisc = (function (_super) {
    __extends(GameDisc, _super);
    function GameDisc() {
        var _this = _super.call(this) || this;
        _this.icon_arr = [];
        _this.icon_res = [];
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
