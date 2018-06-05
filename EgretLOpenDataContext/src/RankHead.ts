class RankHead extends egret.DisplayObjectContainer{
    public constructor(){
        super();
    }

    public render(){
        this.height = 60;
        this.width = this.parent.width;
        let bg_shape: egret.Shape = new egret.Shape();
        bg_shape.graphics.beginFill(0x363636, 1);
        bg_shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg_shape.graphics.endFill();
        this.addChild(bg_shape);
        let l_title = new egret.TextField();
        l_title.x = 20;
        l_title.height = 60;
        l_title.text = "每周一凌晨刷新";
        l_title.textColor = 0x929292;
        l_title.size = 20;
        l_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(l_title);
    }
}