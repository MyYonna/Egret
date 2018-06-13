class BetOnBtn extends egret.DisplayObjectContainer{
    private text:string;
    private text_field:egret.TextField;
    private text_bg:egret.Shape;
    public constructor(text:string){
        super();
        this.text = text;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        this.width = 30;
        this.height = 30;
        //外圈圆
        let btn_bg = new egret.Shape();
        btn_bg.graphics.beginFill(0x1899B9);
        btn_bg.graphics.lineStyle(1,0x135673);
        btn_bg.graphics.drawCircle(this.width/2,this.height/2,15);
        btn_bg.graphics.endFill();
        this.addChild(btn_bg);


        //内圈圆
        this.text_bg = new egret.Shape();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawCircle(this.width/2,this.height/2,13);
        this.text_bg.graphics.endFill();

        this.addChild(this.text_bg);

        //控制字体位置和大小
        this.text_field = new egret.TextField();
        this.text_field.text = this.text;
        this.text_field.textColor = 0x000000;
        this.text_field.bold = true;
        this.text_field.size = this.text_bg.height/2-3;
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
    //按钮不可用
    public disableBtn(){
        this.touchEnabled = false;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0x242431);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawCircle(this.width/2,this.height/2,13);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0xffffff;
    }
    //按钮可用
    public enableBtn(){
        this.touchEnabled = true;
        this.text_bg.graphics.clear();
        this.text_bg.graphics.beginFill(0xFBFB0D);
        this.text_bg.graphics.lineStyle(1,0x135673);
        this.text_bg.graphics.drawCircle(this.width/2,this.height/2,13);
        this.text_bg.graphics.endFill();
        this.text_field.textColor = 0x000000;
    }
}