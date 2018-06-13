class RightPanel extends egret.DisplayObjectContainer{
    public start_btn:BetBtn;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    public render(){
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth - this.parent.getChildAt(2).x - this.parent.getChildAt(2).width-10;
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height/2;
        this.y = this.stage.stageHeight/2;
        this.x = this.stage.stageWidth;

        let right_panel_bg = new egret.Shape();
        right_panel_bg.graphics.beginFill(0xf0f0f0);
        right_panel_bg.graphics.lineStyle(2,0x121212);
        right_panel_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);

        let credit = new Credit();
        this.addChild(credit);

        let betPanel = new BetPanel(0);
        this.addChild(betPanel);

        let betPanel2 = new BetPanel(1);
        this.addChild(betPanel2);

        this.start_btn = new BetBtn("START");
        this.addChild(this.start_btn);
        this.start_btn.anchorOffsetX = this.start_btn.width/2;
        this.start_btn.x = this.width/2;
        this.start_btn.y = betPanel2.y+betPanel2.height+5;

        
        let left_btn = new BetBtn("LEFT");
        this.addChild(left_btn);
        left_btn.anchorOffsetX = left_btn.width;
        left_btn.x = this.width/2-5;
        left_btn.y = this.start_btn.y+this.start_btn.height+5;

        let right_btn = new BetBtn("RIGHT");
        this.addChild(right_btn);
        right_btn.x = this.width/2+5;
        right_btn.y = this.start_btn.y+this.start_btn.height+5;
        this.start_btn.touchEnabled = true;
        // this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginMarquee,this);

    }
        private beginMarquee(i=0){
        console.log(i);
        // this.gameDisc.fruitDiscIcons[i].scaleX = 1.1;
        // this.gameDisc.fruitDiscIcons[i].scaleY = 1.1;
        setTimeout(function() {
            this.beginMarquee(i++);
        }, 1000);
    }
}