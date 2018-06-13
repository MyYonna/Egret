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
var FruitHistory = (function (_super) {
    __extends(FruitHistory, _super);
    function FruitHistory() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    FruitHistory.prototype.render = function () {
        this.height = this.stage.stageHeight * 0.9;
        this.width = 35;
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.stageHeight / 2;
        // let historyShape = new egret.Shape();
        // historyShape.graphics.beginFill(0x141414);
        // historyShape.graphics.lineStyle(1, 0x262626);
        // historyShape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        // historyShape.graphics.endFill();
        // this.addChild(historyShape);
        var history_header = new egret.Bitmap(RES.getRes("History_png"));
        history_header.width = 35;
        history_header.height = 35;
        this.addChild(history_header);
        var history_content = new FruitHistoryContent();
        this.addChild(history_content);
        for (var i = 0; i < 20; i++) {
            var history_item1 = new FruitHistoryItem();
            history_content.addItem(history_item1);
        }
        var history_item2 = new FruitHistoryItem();
        history_content.addItem(history_item2);
        var history_item3 = new FruitHistoryItem();
        history_content.addItem(history_item3);
        var history_item4 = new FruitHistoryItem();
        history_content.addItem(history_item4);
    };
    return FruitHistory;
}(egret.DisplayObjectContainer));
__reflect(FruitHistory.prototype, "FruitHistory");
