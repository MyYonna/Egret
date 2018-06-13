class FruitHistory extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.height = this.stage.stageHeight * 0.9;
        this.width = 35;
        this.anchorOffsetY = this.height / 2;
        this.x = 30;
        this.y = this.stage.stageHeight / 2;

        // let historyShape = new egret.Shape();
        // historyShape.graphics.beginFill(0x141414);
        // historyShape.graphics.lineStyle(1, 0x262626);
        // historyShape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        // historyShape.graphics.endFill();
        // this.addChild(historyShape);


        let history_header = new egret.Bitmap(RES.getRes("History_png"));
        history_header.width = 35;
        history_header.height = 35;
        this.addChild(history_header);

        let history_content = new FruitHistoryContent();

        this.addChild(history_content);
        for(let i=0;i<20;i++){
            let history_item1 = new FruitHistoryItem();
            history_content.addItem(history_item1);
        }
        
        let history_item2 = new FruitHistoryItem();
        history_content.addItem(history_item2);
        
        let history_item3 = new FruitHistoryItem();
        history_content.addItem(history_item3);
        
        let history_item4 = new FruitHistoryItem();
        history_content.addItem(history_item4);
    }
}