class RefreshBtn extends egret.Bitmap{
    public constructor(res:egret.Texture){
        super(res);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    public render(){
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetX = this.width;
        this.x = this.stage.width - 100;
        this.y = this.stage.height -75;
        this.touchEnabled = true;

    }
}