class FruitHistory extends egret.DisplayObjectContainer{
    private history_content:FruitHistoryContent
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.height = this.stage.stageHeight*0.9;
        this.width = 35;
        this.anchorOffsetY = this.height / 2;
        this.x = 10;
        this.y = this.stage.stageHeight / 2;

        let history_header = new egret.Bitmap(RES.getRes("History_png"));
        history_header.width = 35;
        history_header.height = 35;
        this.addChild(history_header);

        let shape = new egret.Shape();
        shape.graphics.beginFill(0xf0f0f0,0.8);
        shape.graphics.drawRect(0,history_header.height,this.width,this.height -  history_header.height)
        shape.graphics.endFill();
        this.addChild(shape);
        this.history_content = new FruitHistoryContent();

        this.addChild(this.history_content);

    }
    public addItem(item:FruitHistoryItem){
         this.history_content.addItem(item);
         
    }
}