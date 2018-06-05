class Rank extends egret.DisplayObjectContainer{
    private background:egret.Shape;
    public constructor(){
        super();
    }
    public setHeader(header:egret.DisplayObject){
         this.addChild(header);
    }

    public setContent(content:egret.DisplayObject){
         this.addChild(content);
       
    }
    public render(){
        this.width = this.stage.stageWidth * 0.8;
        this.height = this.stage.stageHeight * 0.6;
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.x = this.stage.stageWidth >> 1;
        this.y = (this.stage.stageHeight >> 1)-50;
        //为滚动视图添加背景色
        this.background = new egret.Shape();
        this.background.graphics.beginFill(0x363636, 1);
        this.background.graphics.drawRoundRect(0, 0, this.width, this.height,10);
        this.background.graphics.endFill();
        this.addChild(this.background);

    }
}