class FruitHistoryItem extends  egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.width = this.parent.width;
        this.height = this.width;
        this.y = (this.parent.numChildren-1)*this.height;
        let item_bg = new egret.Shape();
        item_bg.graphics.beginFill(0x292a2c);
        
        item_bg.graphics.lineStyle(1,0x6b6565);
        item_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        item_bg.graphics.endFill();
        this.addChild(item_bg);

        let item_icon = new egret.Bitmap(RES.getRes("Arancia_png"));
        item_icon.width = this.width-4;
        item_icon.height = this.height-4;
        item_icon.anchorOffsetX = item_icon.width/2;
        item_icon.anchorOffsetY = item_icon.height/2;
        item_icon.x = this.width/2;
        item_icon.y = this.height/2;
        this.addChild(item_icon);

    }
}