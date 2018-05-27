    class PhotoFrame extends egret.Sprite
    {
        private container:egret.Sprite;
        public constructor(stage:egret.Sprite)
        {
            super();
            this.container = stage;
            this.drawPhotoFrame();
        }
        private drawPhotoFrame()
        {
            var stageWidth = this.container.width;
            var stageHeight = this.container.height;
            var photoFrameW = stageWidth-100;
            var photoFrameH = photoFrameW;
            this.graphics.beginFill( PF_BG_COLOR, 1);//设置相框背景
            //重新设置锚点
            this.anchorOffsetX = photoFrameW/2;
            this.anchorOffsetY = photoFrameH/2;
            this.graphics.lineStyle(PF_BR_WIDTH,PF_BR_COLOR);//设置相框的边框
            this.graphics.drawRect( 0,0,photoFrameW,photoFrameH);
            this.graphics.endFill();
            this.width = photoFrameW;
            this.height = photoFrameH;
            this.x = stageWidth/2;
            this.y = stageHeight/2;
            this.container.addChild(this);
        }
    }