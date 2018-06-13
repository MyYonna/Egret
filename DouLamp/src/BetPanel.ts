class BetPanel extends egret.DisplayObjectContainer{
    private bet_item_infos:BetItemInfo[] = [];
    private index:number;
    public betItems:BetItem[] = [];
    public constructor(index:number){
        super();
        this.index = index;
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    public render(){
        this.height = 70+3+3;
        this.width = this.bet_item_infos.length * (30 +3)+3;
        this.anchorOffsetX = this.width/2;
        this.x = this.parent.width/2;
        let rightPanel = <RightPanel>this.parent;
        this.y = rightPanel.credit.y+rightPanel.credit.height+this.index * (this.height + 5);

        let bet_bg = new egret.Shape();
        bet_bg.graphics.beginFill(0xffffff);
        bet_bg.graphics.lineStyle(1,0x121212);
        bet_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        bet_bg.graphics.endFill();
        this.addChild(bet_bg);

        this.bet_item_infos.forEach((item,index)=>{
             let betItem = new BetItem(item);
             this.addChild(betItem);
             this.betItems.push(betItem);
             betItem.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addBet,this);

        })


    }
    //点击图片，进行押注,1：押注数不能超过9,2：筹码区的金额不能低于0
    private addBet(event:egret.TouchEvent){
        let target:egret.Bitmap = event.currentTarget;
        let betItem:BetItem = <BetItem>target.parent;
        if(betItem.bet_num <9){
            //改变筹码区的数值
            let rightPanel:RightPanel = <RightPanel>this.parent;
            if(rightPanel.credit.creditItem.credit_num>=1){
                rightPanel.credit.creditItem.credit_num--;
                rightPanel.credit.creditItem.credit_num_text.text = rightPanel.credit.creditItem.credit_num+""; 
                bet_buffer++;
                betItem.bet_num++;
                betItem.bet_text_num.text =  betItem.bet_num +"";
            }
        }
        
    }
    private init(){
        if(this.index == 0){

            this.bet_item_infos.push(new BetItemInfo(0,Fruit_Bet[Fruit_ICON.Apple],Fruit_Header_Color[Fruit_ICON.Apple],Fruit_Icons[Fruit_ICON.Apple],0,Fruit_Footer_Color[Fruit_ICON.Apple]));

            this.bet_item_infos.push(new BetItemInfo(1,Fruit_Bet[Fruit_ICON.Watermelon],Fruit_Header_Color[Fruit_ICON.Watermelon],Fruit_Icons[Fruit_ICON.Watermelon],0,Fruit_Footer_Color[Fruit_ICON.Watermelon]));

            this.bet_item_infos.push(new BetItemInfo(2,Fruit_Bet[Fruit_ICON.Cocco],Fruit_Header_Color[Fruit_ICON.Cocco],Fruit_Icons[Fruit_ICON.Cocco],0,Fruit_Footer_Color[Fruit_ICON.Cocco]));

            this.bet_item_infos.push(new BetItemInfo(3,Fruit_Bet[Fruit_ICON.Seven],Fruit_Header_Color[Fruit_ICON.Seven],Fruit_Icons[Fruit_ICON.Seven],0,Fruit_Footer_Color[Fruit_ICON.Seven]));

            this.bet_item_infos.push(new BetItemInfo(4,Fruit_Bet[Fruit_ICON.Chip_50],Fruit_Header_Color[Fruit_ICON.Chip_50],Fruit_Icons[Fruit_ICON.Chip_50],0,Fruit_Footer_Color[Fruit_ICON.Chip_50]));

            this.bet_item_infos.push(new BetItemInfo(5,Fruit_Bet[Fruit_ICON.Chip_100],Fruit_Header_Color[Fruit_ICON.Chip_100],Fruit_Icons[Fruit_ICON.Chip_100],0,Fruit_Footer_Color[Fruit_ICON.Chip_100]));
        }else{

            this.bet_item_infos.push(new BetItemInfo(0,Fruit_Bet[Fruit_ICON.Banana],Fruit_Header_Color[Fruit_ICON.Banana],Fruit_Icons[Fruit_ICON.Banana],0,Fruit_Footer_Color[Fruit_ICON.Banana]));

            this.bet_item_infos.push(new BetItemInfo(1,Fruit_Bet[Fruit_ICON.Lime],Fruit_Header_Color[Fruit_ICON.Lime],Fruit_Icons[Fruit_ICON.Lime],0,Fruit_Footer_Color[Fruit_ICON.Lime]));

            this.bet_item_infos.push(new BetItemInfo(2,Fruit_Bet[Fruit_ICON.Arancia],Fruit_Header_Color[Fruit_ICON.Arancia],Fruit_Icons[Fruit_ICON.Arancia],0,Fruit_Footer_Color[Fruit_ICON.Arancia]));

            this.bet_item_infos.push(new BetItemInfo(3,Fruit_Bet[Fruit_ICON.Strawberry],Fruit_Header_Color[Fruit_ICON.Strawberry],Fruit_Icons[Fruit_ICON.Strawberry],0,Fruit_Footer_Color[Fruit_ICON.Strawberry]));
        }


    }
}