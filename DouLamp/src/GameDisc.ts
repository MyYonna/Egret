class GameDisc extends egret.DisplayObjectContainer {
    private icon_arr: string[] = [];
    private icon_res: string[] = [];
    public fruitDiscIcons:FruitDiscIcon[] = [];
    public constructor() {
        super();
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render() {
        this.height = this.stage.stageHeight * 0.9;
        this.width = this.height;
        this.anchorOffsetY = this.height / 2;
        let main = <Main>this.parent;
        this.x = main.history.x+main.history.width+10;
        this.y = this.stage.stageHeight / 2;

        let gameDiscShape = new egret.Shape();
        gameDiscShape.graphics.beginFill(0xf0f0f0);
        gameDiscShape.graphics.lineStyle(3, 0x262626);
        gameDiscShape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        gameDiscShape.graphics.endFill();
        this.addChild(gameDiscShape);

        this.icon_arr.forEach((item,index)=>{
            if(item != null){
                let r = Math.floor(index/7);
                let c = Math.floor(index%7);
                let fruitDiscIcon: FruitDiscIcon = new FruitDiscIcon(item,r,c);
                this.fruitDiscIcons.push(fruitDiscIcon);
                this.addChild(fruitDiscIcon);
            }
        })
        //圆盘中间内容
        let center = new egret.Bitmap(RES.getRes("bg_jpg"));
        center.height = this.height - (((this.height-32)/7+8) * 2);
        center.width = this.width - (((this.width-32)/7+8) * 2);
        center.anchorOffsetX = center.width / 2;
        center.anchorOffsetY = center.height / 2;
        center.x = this.width / 2;
        center.y = this.height / 2;
        this.addChild(center);





    }

    public init() {
        this.icon_res.push("Arancia_png");
        this.icon_res.push("Banana_png");
        this.icon_res.push("Chip_50_png");
        this.icon_res.push("Chip_100_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Lime_png");



        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Watermelon_png");

        this.icon_res.push("Apple_png");
        this.icon_res.push("Strawberry_png");

        this.icon_res.push("Dice_png");
        this.icon_res.push("Dice_png");

        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Apple_png");

        this.icon_res.push("Cocco_png");
        this.icon_res.push("Strawberry_png");

        this.icon_res.push("Lime_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Apple_png");
        this.icon_res.push("Seven_png");
        this.icon_res.push("Strawberry_png");
        this.icon_res.push("Banana_png");
        this.icon_res.push("Arancia_png");

        for(let i = 0;i<7;i++){
            for(let j = 0;j<7;j++){
                if(i == 0 || i == 6){
                    this.icon_arr.push(this.icon_res.shift());
                }else{
                    if(j == 0||j == 6){
                        this.icon_arr.push(this.icon_res.shift());
                    }else{
                         this.icon_arr.push(null);
                    }
                }
            }
        }
    }
}