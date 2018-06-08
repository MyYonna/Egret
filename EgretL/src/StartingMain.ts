class StartingMain extends egret.DisplayObjectContainer{
    private begin_bg:egret.Shape ;
    private begin_title:egret.Bitmap;
    public  startBtn:StartBtn;
    private end_bg:egret.Shape;
    public btnRank:egret.Bitmap;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        // this.stage.stageWidth = this.stage.stageWidth;
        // this.stage.stageHeight = this.stage.stageHeight;
        this.touchEnabled = false;
        //背景
        this.begin_bg = new egret.Shape();
        this.begin_bg.graphics.beginFill(0x8c8f98,1);
        this.begin_bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        this.begin_bg.graphics.endFill();
        this.begin_bg.touchEnabled = false;
        this.addChild(this.begin_bg);

        //开始标题
        this.begin_title = new egret.Bitmap(RES.getRes("begin_title_png"));
        this.begin_title.height = this.begin_title.height* (300/this.begin_title.width);
        this.begin_title.width = 300;
        this.begin_title.anchorOffsetX = this.begin_title.width/2;
        this.begin_title.anchorOffsetY = this.begin_title.height/2;
        this.begin_title.x = this.stage.stageWidth/2;
        this.begin_title.y = this.stage.stageHeight*0.2;
        this.addChild(this.begin_title);

        //开始游戏
        this.startBtn = new StartBtn();
        this.addChild(this.startBtn);

        //底部
        this.end_bg = new egret.Shape();
        this.end_bg.graphics.beginFill(0x727378,1);
        this.end_bg.graphics.drawRect(0,0,this.stage.stageWidth,150); 
        this.end_bg.graphics.endFill();
        this.end_bg.anchorOffsetY = this.end_bg.height;
        this.end_bg.y = this.stage.stageHeight;
        this.addChild(this.end_bg);

        //排行榜查看按钮
        this.btnRank = new RankBtn(RES.getRes(APP_RANK_VIEW))
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnRank);
    }

}