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
var FruitHistoryContent = (function (_super) {
    __extends(FruitHistoryContent, _super);
    function FruitHistoryContent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistoryContent.prototype.render = function () {
        this.listContainer = new egret.DisplayObjectContainer();
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height - this.parent.getChildAt(0).height;
        this.y = this.parent.getChildAt(0).height;
        this.listContainer.width = this.width;
    };
    FruitHistoryContent.prototype.addItem = function (item) {
        this.listContainer.addChild(item);
    };
    return FruitHistoryContent;
}(egret.ScrollView));
__reflect(FruitHistoryContent.prototype, "FruitHistoryContent");
