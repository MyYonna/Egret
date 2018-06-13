class BetItem extends egret.DisplayObjectContainer{
    private index:number;
    private icon:string;
    private turn_number:number;
    private header_color:number;
    private footer_color:number;
    public bet_num:number;
    public constructor(betItemInfo:BetItemInfo){
         super();
         this.index = betItemInfo.index;
         this.turn_number = betItemInfo.turn_number;
         this.bet_num = betItemInfo.bet_number;
         this.icon = betItemInfo.icon;
         this.header_color = betItemInfo.header_color;
         this.footer_color = betItemInfo.footer_color;
         this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    public render(){
        this.width = 30;
        this.height = 70;
        this.x = this.width*this.index+3*(this.index+1);
        this.y = 3;
        //背景
        let bet_item_bg = new egret.Shape();
        bet_item_bg.graphics.beginFill(0xffffff);
        bet_item_bg.graphics.lineStyle(1,0x121212);
        bet_item_bg.graphics.drawRoundRect(0,0,this.width,this.height,1);
        bet_item_bg.graphics.endFill();
        this.addChild(bet_item_bg);
        //头部背景
        let bet_item_header = new egret.Shape();
        bet_item_header.graphics.beginFill(this.header_color);
        bet_item_header.graphics.lineStyle(1,0x121212);
        bet_item_header.graphics.drawRoundRect(0,0,this.width ,this.height*0.25,1);
        bet_item_header.graphics.endFill();
        this.addChild(bet_item_header);
        //头部文字
        let bet = new egret.TextField();
        bet.text = this.turn_number+"";
        bet.textColor = 0x000000;
        bet.size =  bet_item_header.height-5;
        bet.width = this.width;
        bet.height = bet_item_header.height;
        bet.textAlign = egret.HorizontalAlign.CENTER;
        bet.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet);
        //中间图片
        let bet_item_icon = new egret.Bitmap(RES.getRes(this.icon));
        bet_item_icon.width = this.height*0.3;
        bet_item_icon.height = this.height*0.3;
        bet_item_icon.anchorOffsetX = bet_item_icon.width/2;
        bet_item_icon.x = this.width/2;
        bet_item_icon.y = bet_item_header.height;
        this.addChild(bet_item_icon);
        //押注数背景
        let bet_item_footer = new egret.Shape();
        bet_item_footer.graphics.beginFill(this.footer_color);
        bet_item_footer.graphics.lineStyle(1,0x121212);
        bet_item_footer.graphics.drawRoundRect(0,0,this.width,this.height*0.45 ,1);
        bet_item_footer.graphics.endFill();
        bet_item_footer.y = bet_item_icon.y+bet_item_icon.height;
        this.addChild(bet_item_footer);
        //点击押注数量
        let bet_num = new egret.TextField();
        bet_num.text = this.bet_num+"";
        bet_num.textColor = 0xffffff;
        bet_num.size = bet_item_footer.width;
        bet_num.width = this.width;
        bet_num.height = bet_item_footer.height;
        bet_num.y = bet_item_footer.y;
        bet_num.textAlign = egret.HorizontalAlign.CENTER;
        bet_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet_num);

    }
}