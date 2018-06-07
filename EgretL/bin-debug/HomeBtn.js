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
