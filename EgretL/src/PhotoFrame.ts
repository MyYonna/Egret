    class PhotoFrame extends egret.DisplayObjectContainer
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
        }
        public render()
        {
            //设置本容器的属性
            let stageWidth = this.stage.stageWidth;
            let stageHeight = this.stage.stageHeight;
            let photoFrameW = stageWidth-100;
            let photoFrameH = photoFrameW;
            this.width = photoFrameW;
            this.height = photoFrameH;
            //重新设置锚点
            this.anchorOffsetX = photoFrameW/2;
            this.anchorOffsetY = photoFrameH/2;
            this.x = stageWidth/2;
            this.y = stageHeight/2;
            //为本容器加入背景组件
            let photoFrameBg = new egret.Shape();
            photoFrameBg.graphics.beginFill( PF_BG_COLOR, 1);//设置相框背景
            photoFrameBg.graphics.lineStyle(PF_BR_WIDTH,PF_BR_COLOR);//设置相框的边框
            photoFrameBg.graphics.drawRect( 0,0,photoFrameW,photoFrameH);
            photoFrameBg.graphics.endFill();
            this.addChild(photoFrameBg);
        }
    }