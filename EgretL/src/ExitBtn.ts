class ExitBtn extends egret.Bitmap{
    public constructor(res:egret.Texture){
        super(res);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.x = 30;
        this.y = this.stage.stageHeight -30;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            wx.exitMiniProgram({
                success:res=>{},
                fail:res=>{},
                complete:res=>{}
            })
    },this);
    }
}