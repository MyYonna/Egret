class RankContent extends egret.ScrollView{
    public constructor(){
        super();
    }

    public render(){
        const listContainer = new egret.DisplayObjectContainer();
        //设置滚动视图的内容区域以及其定位和高宽
        this.setContent(listContainer);
        this.width = this.stage.stageWidth * 0.8;
        this.height = this.stage.stageHeight * 0.6;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2
        this.x = this.stage.stageWidth >> 1;
        this.y = (this.stage.stageHeight >> 1)-50;
        //为滚动视图添加背景色
        var background: egret.Shape = new egret.Shape();
        // background.graphics.lineStyle(1,0x797b7e);;
        background.graphics.beginFill(0x363636, 1);
        background.graphics.drawRect(0, 0, this.width, this.height);
        background.graphics.endFill();
        //定位滚动视图背景色的位置
        background.anchorOffsetX = background.width >> 1;
        background.anchorOffsetY = background.height >> 1;
        background.x = this.stage.stageWidth >> 1;
        background.y = (this.stage.stageHeight >> 1 )-50;
        this.stage.addChild(background);
        this.stage.addChild(this);
    }

    public listContainer:egret.DisplayObjectContainer;
}