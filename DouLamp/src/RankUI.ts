class RankUI extends egret.DisplayObjectContainer{
    private rankingListMask:egret.Shape;
    private rankingButtomMask:egret.Shape;
    private bitmap:egret.Bitmap;
    public btnClose:egret.Bitmap;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    public render(){
        this.width = this.parent.width;
        this.height = this.parent.height;
        //处理遮罩，避免开放数据域事件影响主域。
        this.rankingListMask = new egret.Shape();
        this.rankingListMask.graphics.beginFill(0x686b72, 1);
        this.rankingListMask.graphics.drawRect(0, 1, this.width, this.height);
        this.rankingListMask.graphics.endFill();
        this.rankingListMask.alpha = 0.7;
        this.rankingListMask.touchEnabled = true;
        this.addChild(this.rankingListMask);
        
        // 将离屏的canvas生成图片，贴到主屏
        const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        this.bitmap = new egret.Bitmap(texture);
        this.bitmap.width = this.width;
        this.bitmap.height = this.height;
        this.bitmap.alpha = 0.8;
        this.addChild(this.bitmap);
        // 画一个返回的按钮
        this.btnClose = new egret.Bitmap(RES.getRes(APP_RANK_BACK));
        this.btnClose.height = 30;
        this.btnClose.width = 30;
        this.btnClose.anchorOffsetY = this.btnClose.height;
        this.btnClose.x = 10;
        this.btnClose.y = this.height-2;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnClose);
        this.btnClose.touchEnabled = true;
        egret.startTick((timeStarmp: number) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
    }
}