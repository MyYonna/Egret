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
var RankContent = (function (_super) {
    __extends(RankContent, _super);
    function RankContent() {
        var _this = _super.call(this) || this;
        _this.listContainer = new egret.DisplayObjectContainer();
        return _this;
    }
    RankContent.prototype.render = function () {
        //设置滚动视图的内容区域以及其定位和高宽
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height - 60;
        this.y = this.parent.getChildAt(1).height;
    };
    ;
    return RankContent;
}(egret.ScrollView));
__reflect(RankContent.prototype, "RankContent");
