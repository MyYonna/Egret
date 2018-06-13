class CreditItem extends egret.DisplayObjectContainer{
    public credit_num:number;
    public credit_num_text:egret.TextField;
    public constructor(credit_num:number){
        super();
        this.credit_num = credit_num;
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

        this.credit_num_text = new egret.TextField();
        this.credit_num_text.text = this.credit_num+"";
        this.credit_num_text.height = this.height;
        this.credit_num_text.width = this.width-this.height;
        this.credit_num_text.anchorOffsetX = this.credit_num_text.width/2;
        this.credit_num_text.anchorOffsetY = this.credit_num_text.height/2;
        this.credit_num_text.x = this.width/2;
        this.credit_num_text.y = this.height/2;
        this.credit_num_text.size = this.height;
        this.credit_num_text.textColor = 0xffffff;
        this.credit_num_text.textAlign = egret.HorizontalAlign.CENTER;
        this.credit_num_text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.credit_num_text);

    }
}