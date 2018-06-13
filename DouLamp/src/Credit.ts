class Credit extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        //大背景
        let bg = new egret.Shape();
        bg.graphics.beginFill(0xFFEB1D);
        bg.graphics.lineStyle(1,0x471200);
        bg.graphics.drawEllipse(0,0,this.parent.width*0.9,120);
        bg.graphics.endFill();
        this.addChild(bg);
        //内圈背景
        let center_bg = new egret.Shape();
        center_bg.graphics.beginFill(0xFFFFBF);
        center_bg.graphics.lineStyle(1,0x471200);
        center_bg.graphics.drawEllipse(0,0,bg.width-15,bg.height-15);
        center_bg.graphics.endFill();
        center_bg.anchorOffsetX = center_bg.width/2;
        center_bg.anchorOffsetY = center_bg.height/2;
        center_bg.x = this.width/2;
        center_bg.y= this.height/2;
        this.addChild(center_bg);
        //钱币图标
        let money_icon = new egret.Bitmap(RES.getRes("Money_png"));
        money_icon.scaleX = 0.8;
        money_icon.scaleY = 0.8;
        this.addChild(money_icon);


        //credit范围筹码
        let credit =new CreditItem();
        this.addChild(credit);
        credit.anchorOffsetY = credit.height;
        credit.y= (this.height/2)-15;
        //bonus-win奖金
        let bonus_win =new CreditItem();
        this.addChild(bonus_win);
        bonus_win.y= (this.height/2)+5;
        //说明
        let credit_text = new egret.TextField();
        credit_text.text = "CREDIT";
        credit_text.bold = true;
        credit_text.width = this.width;
        credit_text.height = 15;
        credit_text.textAlign = egret.HorizontalAlign.CENTER;
        credit_text.anchorOffsetY = credit_text.height;
        credit_text.y = credit.y - credit.height-2;
        credit_text.size = 15;
        credit_text.textColor = 0xb63f1f;
        this.addChild(credit_text);


        //奖金区
        let bonus_win_text = new egret.TextField();
        bonus_win_text.text = "BONUS-WIN";
        bonus_win_text.bold = true;
        bonus_win_text.width = this.width;
        bonus_win_text.height = 15;
        bonus_win_text.textAlign = egret.HorizontalAlign.CENTER;
        bonus_win_text.y = bonus_win.y + bonus_win.height+2;
        bonus_win_text.size = 15;
        bonus_win_text.textColor = 0xb63f1f;
        this.addChild(bonus_win_text);
        //添加向上将奖金划入筹码区
        let winToCredit = new egret.Bitmap(RES.getRes("WinToCredit_png"));
        winToCredit.scaleX = 0.5;
        winToCredit.scaleY = 0.5;
        winToCredit.anchorOffsetX = winToCredit.width/2;
        winToCredit.anchorOffsetY = winToCredit.height/2;
        winToCredit.skewY = 180;
        winToCredit.x = credit.x+credit.width/2+10;
        winToCredit.y = this.height/2;
        this.addChild(winToCredit);
        this.anchorOffsetX = this.width/2;

        this.x = this.parent.width/2;
        
    }
}