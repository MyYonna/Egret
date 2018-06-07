class HomeBtn extends egret.DisplayObjectContainer{
    public constructor(){
        super();
    }

    public render(){
        let homeBtn = new egret.Bitmap(RES.getRes("page_home_png"));
        this.addChild(homeBtn);
        this.x = 30;
        this.y = this.stage.stageHeight-30-homeBtn.height;
        this.touchEnabled = true;
    }
}