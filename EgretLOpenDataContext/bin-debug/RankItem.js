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
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem(index, value, single) {
        var _this = _super.call(this) || this;
        _this.single = false;
        _this.index = 0;
        _this.single = single;
        _this.index = index;
        _this.value = value;
        return _this;
    }
    RankItem.prototype.render = function () {
        var _this = this;
        //条目背景
        var bg_shape = new egret.Shape();
        bg_shape.graphics.beginFill(this.index % 2 == 0 ? 0x363636 : 0x404040, 1);
        if (this.single) {
            bg_shape.graphics.lineStyle(1, 0x797b7e);
            bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        }
        else {
            bg_shape.graphics.drawRect(0, 0, this.width, this.height);
        }
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        //排行
        var rank = new egret.TextField();
        rank.x = 20;
        rank.height = 100;
        rank.text = this.index + 1 + "";
        rank.textColor = this.index == 0 ? 0xff7100 : this.index == 1 || this.index == 2 ? 0xffc113 : 0xa9a9a9;
        rank.size = 25;
        rank.bold = true;
        rank.italic = true;
        rank.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(rank);
        //图片
        var imageLoader = new egret.ImageLoader();
        var bgtexture = new egret.Texture();
        imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            bgtexture._setBitmapData(imageLoader.data);
            var bitmap = new egret.Bitmap(bgtexture);
            bitmap.width = 50;
            bitmap.height = 50;
            bitmap.x = 70;
            bitmap.anchorOffsetY = bitmap.height >> 1;
            bitmap.y = 50;
            _this.addChild(bitmap);
        }, this);
        imageLoader.load(this.value.avatarUrl);
        //昵称
        var nicktxt = new egret.TextField();
        nicktxt.x = 150;
        nicktxt.height = 100;
        nicktxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        nicktxt.text = this.value.nickname;
        nicktxt.size = 20;
        this.addChild(nicktxt);
        //分数
        var numtxt = new egret.TextField();
        numtxt.x = this.width - 80;
        numtxt.height = 100;
        numtxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        numtxt.textAlign = egret.HorizontalAlign.RIGHT;
        numtxt.text = this.value.score + "";
        numtxt.size = 26;
        this.addChild(numtxt);
    };
    return RankItem;
}(egret.DisplayObjectContainer));
__reflect(RankItem.prototype, "RankItem");
