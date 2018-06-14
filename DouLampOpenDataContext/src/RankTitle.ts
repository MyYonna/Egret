class RankTitle extends egret.TextField{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.text = "好友排行榜";
        this.size = 40;
        this.width = this.stage.stageWidth;
        this.y = 50;
        this.textAlign = egret.HorizontalAlign.CENTER;
        this.textColor = 0xffffff;
    }
}