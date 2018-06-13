class BetPanel extends egret.DisplayObjectContainer{
    private bet_item_infos:BetItemInfo[] = [];
    private index:number;
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
        this.y = 125+this.index * (this.height + 5);

        let bet_bg = new egret.Shape();
        bet_bg.graphics.beginFill(0xffffff);
        bet_bg.graphics.lineStyle(1,0x121212);
        bet_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        bet_bg.graphics.endFill();
        this.addChild(bet_bg);

        this.bet_item_infos.forEach((item,index)=>{
             this.addChild(new BetItem(item));
        })


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