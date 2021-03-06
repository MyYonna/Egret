class BetBtn extends egret.DisplayObjectContainer{
    private text:string;
    private text_bg:egret.Shape;
    private text_field:egret.TextField;
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

        this.text_bg = new egret.Shape();
        
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawRoundRect(0,0,70,20,20);
        this.text_bg.graphics.endFill();

        this.text_bg.anchorOffsetX = this.text_bg.width/2;
        this.text_bg.anchorOffsetY = this.text_bg.height/2;
        this.text_bg.x = this.width/2;
        this.text_bg.y = this.height/2;
        this.addChild(this.text_bg);

        this.text_field = new egret.TextField();
        this.text_field.text = this.text;
        this.text_field.bold = true;
        this.text_field.textColor = 0xffffff;
        this.text_field.size = this.text_bg.height-10;
        this.text_field.width = this.width;
        this.text_field.height = this.height;
        this.text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.text_field);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        },this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function(){
            this.scaleX = 1;
            this.scaleY = 1;
        },this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this.scaleX = 1;
            this.scaleY = 1;
        },this);
        
    }

    public disableBtn(){
        this.touchEnabled = false;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawRoundRect(0,0,70,20,20);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0xffffff;
    }

    public enableBtn(){
        this.touchEnabled = true;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawRoundRect(0,0,70,20,20);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0x000000;
    }
}