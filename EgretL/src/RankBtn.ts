class RankBtn extends egret.Bitmap{
    public constructor(res:egret.Texture){
        super(res);
    }
    public render(){
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.height -75;
        this.touchEnabled = true;

    }
}