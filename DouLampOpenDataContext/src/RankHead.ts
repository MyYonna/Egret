class RankHead extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        this.height = 30;
        this.width = this.parent.width;
        let bg_shape: egret.Shape = new egret.Shape();
        bg_shape.graphics.beginFill(0x363636, 1);
        bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        let l_title = new egret.TextField();
        l_title.x = 20;
        l_title.height = this.height;
        l_title.width = this.width;
        l_title.text = "每周一凌晨刷新";
        l_title.textColor = 0xf0f0f0;
        l_title.size = 20;
        l_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(l_title);
    }
}