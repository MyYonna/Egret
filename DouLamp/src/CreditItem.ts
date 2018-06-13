class CreditItem extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        this.width = this.parent.width - 90;
        this.height = 30;
                
        this.anchorOffsetX = this.width/2;
        this.x = this.parent.width/2;

        let credit = new egret.Shape();
        credit.graphics.beginFill(0x5d1d1d);
        credit.graphics.lineStyle(1,0x121212);
        credit.graphics.drawRoundRect(0,0,this.width,this.height,this.height);
        credit.graphics.endFill();
        this.addChild(credit);

        let credit_num = new egret.TextField();
        credit_num.text = "888888";
        credit_num.height = this.height;
        credit_num.width = this.width-this.height;
        credit_num.anchorOffsetX = credit_num.width/2;
        credit_num.anchorOffsetY = credit_num.height/2;
        credit_num.x = this.width/2;
        credit_num.y = this.height/2;
        credit_num.size = this.height;
        credit_num.textColor = 0xffffff;
        credit_num.textAlign = egret.HorizontalAlign.CENTER;
        credit_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(credit_num);

    }
}