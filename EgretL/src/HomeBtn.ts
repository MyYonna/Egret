class HomeBtn extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        let homeBtn = new egret.Bitmap(RES.getRes("page_home_png"));
        this.addChild(homeBtn);
        this.x = 30;
        this.y = this.stage.stageHeight-30-homeBtn.height;
        this.touchEnabled = true;
    }
}