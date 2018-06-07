class RefreshBtn extends egret.Bitmap{
    public constructor(res:egret.Texture){
        super(res);
    }
    public render(){
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetX = this.width;
        this.x = this.stage.width - 100;
        this.y = this.stage.height -75;
        this.touchEnabled = true;

    }
}