class RankBtn extends egret.Bitmap{
    public constructor(res:string){
        super(RES.getRes(res));
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }
    public render(){
        let parent = <RightPanel>this.parent;
        this.anchorOffsetX = this.width;
        this.x = parent.width - 15;
        this.y = parent.betPanel2.y+parent.betPanel2.height+2;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        },this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function(){
            this.scaleX = 1;
            this.scaleY = 1;
        },this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this.scaleX = 1;
            this.scaleY = 1;
        },this);
    }
}