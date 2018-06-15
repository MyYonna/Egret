class RankItem extends egret.DisplayObjectContainer {
    private single:boolean = false;
    private index:number = 0;
    private value:RankInfo;
    public constructor(index:number,value:RankInfo,single:boolean){
        super();
        this.single = single;
        this.index = index;
        this.value = value;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        //条目背景
        let bg_shape: egret.Shape = new egret.Shape();
        bg_shape.graphics.beginFill(this.index % 2 == 0 ? 0x363636 : 0x404040, 1);
        if(this.single){
            bg_shape.graphics.lineStyle(1,0x797b7e);
            bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height,10);
        }else{
             bg_shape.graphics.drawRect(0, 0, this.width, this.height);
        }
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        //排行
        let rank = new egret.TextField();
        rank.x = 10;
        rank.height = 30;
        rank.text = this.index + 1 + "";
        rank.textColor = this.index == 0 ? 0xff7100 : this.index == 1 || this.index == 2 ? 0xffc113 : 0xa9a9a9;
        rank.size = 25;
        rank.bold = true;
        rank.italic = true;
        rank.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(rank);
        //图片
        let imageLoader = new egret.ImageLoader();
        var bgtexture = new egret.Texture();
        imageLoader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            bgtexture._setBitmapData(imageLoader.data);
            let bitmap = new egret.Bitmap(bgtexture);
            bitmap.width = rank.height-5;
            bitmap.height = rank.height-5;
            bitmap.x = 70;
            bitmap.anchorOffsetY = bitmap.height >> 1;
            bitmap.y = 15;
            this.addChild(bitmap);
        }, this);
        imageLoader.load(this.value.avatarUrl);

        //昵称
        let nicktxt = new egret.TextField();
        nicktxt.x = 150;
        nicktxt.height = rank.height;
        nicktxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        nicktxt.text = this.value.nickname;
        nicktxt.size = 20;
        this.addChild(nicktxt);
        //分数
        let numtxt = new egret.TextField();
        numtxt.x = this.width - 120;
        numtxt.height = rank.height;
        numtxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        numtxt.textAlign = egret.HorizontalAlign.RIGHT;
        numtxt.text = this.value.score+"";
        numtxt.size = 25;
        this.addChild(numtxt);
    }
}