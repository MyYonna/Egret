class StartingMain extends egret.DisplayObjectContainer{
    private begin_bg:egret.Shape;
    private begin_title:egret.Bitmap;
    public  startBtn:StartBtn = new StartBtn();
    private end_bg:egret.Shape;
    public btnRank:egret.Bitmap = new egret.Bitmap(RES.getRes(APP_RANK_VIEW));
    public constructor(){
        super();
    }

    public async render(){
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        //背景
        this.begin_bg = new egret.Shape();
        this.begin_bg.graphics.beginFill(0x8c8f98,1);
        this.begin_bg.graphics.drawRect(0,0,this.width,this.height);
        this.begin_bg.graphics.endFill();
        this.addChild(this.begin_bg);

        //开始标题
        await RES.getResAsync("begin_title_png");
        this.begin_title = new egret.Bitmap(RES.getRes("begin_title_png"));
        this.begin_title.height = this.begin_title.height* (300/this.begin_title.width);
        this.begin_title.width = 300;
        this.begin_title.anchorOffsetX = this.begin_title.width/2;
        this.begin_title.anchorOffsetY = this.begin_title.height/2;
        this.begin_title.x = this.width/2;
        this.begin_title.y = this.height*0.2;
        this.addChild(this.begin_title);

        //开始游戏
        this.addChild(this.startBtn);
        this.startBtn.touchEnabled = true;
        this.startBtn.render();
        //底部
        this.end_bg = new egret.Shape();
        this.end_bg.graphics.beginFill(0x727378,1);
        this.end_bg.graphics.drawRect(0,0,this.width,150); 
        this.end_bg.graphics.endFill();
        this.end_bg.anchorOffsetY = this.end_bg.height;
        this.end_bg.y = this.height;
        this.addChild(this.end_bg);

        //排行榜查看按钮
        this.btnRank.anchorOffsetY = this.btnRank.height / 2;
        this.btnRank.anchorOffsetX = this.btnRank.width / 2;
        this.btnRank.x = 80;
        this.btnRank.y = this.height -75;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnRank);
        this.btnRank.touchEnabled = true;
    }

}