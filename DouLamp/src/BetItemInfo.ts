class BetItemInfo{
    public index:number;
    public turn_number:number
    public header_color:number;
    public icon:string;
    public bet_number:number;
    public footer_color:number;

    public constructor(index,turn_number,header_color,icon,bet_number,footer_color){
        this.index = index;
        this.turn_number = turn_number;
        this.header_color = header_color;
        this.icon = icon;
        this.bet_number = bet_number;
        this.footer_color = footer_color;
    }
}