class RankBtn extends egret.Bitmap{
    public constructor(res:egret.Texture){
        super(res);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    public render(){
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetX = this.width / 2;
        this.x = 80;
        this.y = this.stage.stageHeight -75;
        this.touchEnabled = true;

    }
}