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
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        return _super.call(this) || this;
    }
    Rank.prototype.setHeader = function (header) {
        this.addChild(header);
    };
    Rank.prototype.setContent = function (content) {
        this.addChild(content);
    };
    Rank.prototype.render = function () {
        this.width = this.stage.stageWidth * 0.8;
        this.height = this.stage.stageHeight * 0.6;
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.x = this.stage.stageWidth >> 1;
        this.y = (this.stage.stageHeight >> 1) - 50;
        //为滚动视图添加背景色
        this.background = new egret.Shape();
        this.background.graphics.beginFill(0x363636, 1);
        this.background.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        this.background.graphics.endFill();
        this.addChild(this.background);
    };
    return Rank;
}(egret.DisplayObjectContainer));
__reflect(Rank.prototype, "Rank");
