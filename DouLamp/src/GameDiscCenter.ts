class GameDiscCenter extends egret.DisplayObjectContainer{
    public text_field:egret.TextField;
    public text_num:number = 0;
    public lamp1_yellow:egret.Bitmap;
    public lamp2_yellow:egret.Bitmap;
    public lamp1_red:egret.Bitmap;
    public lamp2_red:egret.Bitmap;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        this.height = this.parent.height - (((this.parent.height-32)/7+8) * 2);
        this.width = this.parent.width - (((this.parent.width-32)/7+8) * 2);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;

        let center = new egret.Shape();
        center.graphics.lineStyle(3,0x262626) ;
        center.graphics.drawRoundRect(0,0,this.width,this.height,10);
        this.addChild(center);

        this.lamp1_red = new egret.Bitmap(RES.getRes("Lantern_Lamp_Red_png"));
        this.lamp1_red.anchorOffsetY = this.lamp1_red.height/2;
        this.lamp1_red.x = 10;
        this.lamp1_red.y = this.height/2;
        this.addChild(this.lamp1_red);

        this.lamp2_red = new egret.Bitmap(RES.getRes("Lantern_Lamp_Red_png"));
        this.lamp2_red.anchorOffsetY = this.lamp2_red.height/2;
        this.lamp2_red.anchorOffsetX= this.lamp2_red.width;
        this.lamp2_red.x = this.width - 10;
        this.lamp2_red.y = this.height/2;
        this.addChild(this.lamp2_red);

        this.lamp1_yellow = new egret.Bitmap(RES.getRes("Lantern_Lamp_Yellow_png"));
        this.lamp1_yellow.anchorOffsetY = this.lamp1_yellow.height/2;
        this.lamp1_yellow.x = 10;
        this.lamp1_yellow.y = this.height/2;
        this.addChild(this.lamp1_yellow);

        this.lamp2_yellow = new egret.Bitmap(RES.getRes("Lantern_Lamp_Yellow_png"));
        this.lamp2_yellow.anchorOffsetY = this.lamp2_yellow.height/2;
        this.lamp2_yellow.anchorOffsetX= this.lamp2_yellow.width;
        this.lamp2_yellow.x = this.width - 10;
        this.lamp2_yellow.y = this.height/2;
        this.addChild(this.lamp2_yellow);

        let lr_bg = new egret.Shape();
        lr_bg.graphics.beginFill(0x5D1D1D,1);
        lr_bg.graphics.lineStyle(1,0x121212);
        lr_bg.graphics.drawRect(0,0,30,60);
        lr_bg.graphics.endFill();
        lr_bg.anchorOffsetX = lr_bg.width/2;
        lr_bg.anchorOffsetY = lr_bg.height/2;
        lr_bg.x = this.width/2;
        lr_bg.y = this.height/2;
        this.addChild(lr_bg);

        this.text_field = new egret.TextField();
        this.text_field.height = this.height;
        this.text_field.width = this.width;
        this.text_field.text = this.text_num+"";
        this.text_field.size = lr_bg.width;
        this.text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_field.textColor = 0xffffff;
        this.addChild(this.text_field);
        
    }
    //产生一个随机数
    private random_interval:number;
    private twinkle_interval:number;
    public produceRandomNum(){
        let that = this;
        this.random_interval = setInterval(function(){
             that.text_num = Math.floor(Math.random()*10);
             that.text_field.text = that.text_num+"";
        },200)
    }
    //停止产生随机数
    public stopProduceRanom(){
        clearInterval(this.random_interval);
    }
    //闪烁喜灯
    public twinkleLamp(){
        let that = this;
        this.twinkle_interval = setInterval(function(){
            that.swapChildren(that.lamp1_red,that.lamp1_yellow);
            that.swapChildren(that.lamp2_red,that.lamp2_yellow);
        },200)
    }
    //停止喜灯
    public stopTwinkleLamp(){
        clearInterval(this.twinkle_interval);
    }
}