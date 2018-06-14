class Rank extends egret.DisplayObjectContainer{
    private background:egret.Shape;
    public rankContent:RankContent;
    public rankHead:RankHead;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    public render(){
        this.width = this.stage.stageWidth * 0.9;
        this.height = this.stage.stageHeight * 0.8;
        this.anchorOffsetX = this.width >> 1;
        this.x = this.stage.stageWidth >> 1;
        this.y = 10;
        //为滚动视图添加背景色
        this.background = new egret.Shape();
        this.background.graphics.beginFill(0x363636, 1);
        this.background.graphics.drawRoundRect(0, 0, this.width, this.height,10);
        this.background.graphics.endFill();
        this.addChild(this.background);

        //绘制排行榜的头部
        this.rankHead = new RankHead();
        this.addChild(this.rankHead);

        //内容区域
        this.rankContent = new RankContent();
        this.addChild(this.rankContent);

    }
}