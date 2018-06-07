class ImagePreview extends egret.DisplayObjectContainer{
    private index:number;
    private photo:Photo;
    private preview_img:egret.Bitmap;
    private circle:egret.Shape;
    public constructor(index:number,photo:Photo){
        super();
        this.index = index;
        this.photo = photo;
    }
    public async render(){
        //加载图片
        await RES.getResAsync(CURRENT_STATION_CHARACTER_PRE+this.index);
        this.preview_img = new egret.Bitmap(RES.getRes(CURRENT_STATION_CHARACTER_PRE+this.index));
        var scale = this.preview_img.width>this.preview_img.height?this.preview_img.height/75:this.preview_img.width/75;
        this.preview_img.width = this.preview_img.width / scale;
        this.preview_img.height = this.preview_img.height / scale;
        //初始化这个图片容器的位置和宽高
        this.width = this.preview_img.width;
        this.height = this.preview_img.height;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.x = this.stage.stageWidth/2;
        this.y = this.stage.stageHeight-75;

        this.addChild(this.preview_img);
        //初始化图片的蒙版
        this.circle = new egret.Shape();
        this.circle.graphics.beginFill(0xffffff,1);
        this.circle.graphics.drawCircle(0,0,37.5);
        this.circle.graphics.endFill();

        this.circle.x = this.width/2;
        this.circle.y = this.height-37.5;
        this.preview_img.mask = this.circle;

        this.addChild(this.circle);
        //注册这个容器的监听
        this.touchEnabled = true;

    }
}