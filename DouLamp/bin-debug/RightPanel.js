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
var RightPanel = (function (_super) {
    __extends(RightPanel, _super);
    function RightPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    RightPanel.prototype.render = function () {
        this.height = this.stage.stageHeight * 0.9;
        this.width = this.stage.stageWidth - this.parent.getChildAt(2).x - this.parent.getChildAt(2).width - 10;
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height / 2;
        this.y = this.stage.stageHeight / 2;
        this.x = this.stage.stageWidth;
        var right_panel_bg = new egret.Shape();
        right_panel_bg.graphics.beginFill(0xf0f0f0);
        right_panel_bg.graphics.lineStyle(2, 0x121212);
        right_panel_bg.graphics.drawRoundRect(0, 0, this.width, this.height, 5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);
        var credit = new Credit();
        this.addChild(credit);
        var betPanel = new BetPanel(0);
        this.addChild(betPanel);
        var betPanel2 = new BetPanel(1);
        this.addChild(betPanel2);
        var start_btn = new BetBtn("START");
        this.addChild(start_btn);
        start_btn.anchorOffsetX = start_btn.width / 2;
        start_btn.x = this.width / 2;
        start_btn.y = betPanel2.y + betPanel2.height + 10;
        var left_btn = new BetBtn("LEFT");
        this.addChild(left_btn);
        left_btn.anchorOffsetX = left_btn.width;
        left_btn.x = this.width / 2 - 5;
        left_btn.y = start_btn.y + start_btn.height + 10;
        var right_btn = new BetBtn("RIGHT");
        this.addChild(right_btn);
        right_btn.x = this.width / 2 + 5;
        right_btn.y = start_btn.y + start_btn.height + 10;
    };
    return RightPanel;
}(egret.DisplayObjectContainer));
__reflect(RightPanel.prototype, "RightPanel");
