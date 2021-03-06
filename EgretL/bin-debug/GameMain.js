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
