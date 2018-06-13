class BetBtn extends egret.DisplayObjectContainer{
    private text:string;
    public constructor(text:string){
        super();
        this.text = text;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        let btn_bg = new egret.Shape();
        btn_bg.graphics.beginFill(0x1899B9);
        btn_bg.graphics.lineStyle(1,0x135673);
        btn_bg.graphics.drawRoundRect(0,0,80,25,20);
        btn_bg.graphics.endFill();
        this.addChild(btn_bg);

        let text_bg = new egret.Shape();
        
        text_bg.graphics.beginFill(0xFBFB0D);
        text_bg.graphics.lineStyle(1,0x135673);
        text_bg.graphics.drawRoundRect(0,0,70,20,20);
        text_bg.graphics.endFill();

        text_bg.anchorOffsetX = text_bg.width/2;
        text_bg.anchorOffsetY = text_bg.height/2;
        text_bg.x = this.width/2;
        text_bg.y = this.height/2;
        this.addChild(text_bg);

        let text = new egret.TextField();
        text.text = this.text;
        text.bold = true;
        text.textColor = 0x000000;
        text.size = text_bg.height-10;
        text.anchorOffsetX = text.width/2;
        text.anchorOffsetY = text.height/2;
        text.x = this.width/2;
        text.y = this.height/2;
        this.addChild(text);
        
    }
}