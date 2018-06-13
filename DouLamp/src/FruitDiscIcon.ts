class FruitDiscIcon extends egret.DisplayObjectContainer{
    public icon_res:string;
    private icon:egret.Bitmap;
    private row_index:number;
    private column_index:number;
    public constructor(icon_res:string,row_index:number,column_index:number){
        super();
        this.icon_res = icon_res;
        this.row_index = row_index;
        this.column_index = column_index;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    public render(){
        this.width = (this.parent.width-32)/7;
        this.height = (this.parent.height-32)/7;

        this.x = this.column_index * (this.width) + (this.column_index+1)*4;
        this.y = this.row_index * (this.height) + (this.row_index+1)*4;;

        //icon的背景和描边
        let icon_round = new egret.Shape();
        icon_round.graphics.beginFill(ICON_COLOR[(this.row_index+this.column_index)%3]);
        icon_round.graphics.lineStyle(1,0x87a26b);
        icon_round.graphics.drawRoundRect(0,0,this.width,this.height,20);
        icon_round.graphics.endFill();
        this.addChild(icon_round);
        //icon的图片
        this.icon = new egret.Bitmap(RES.getRes(this.icon_res));
        this.icon.width = this.width;
        this.icon.height = this.height;
        this.icon.anchorOffsetX = this.icon.width/2;
        this.icon.anchorOffsetY = this.icon.height/2;
        this.icon.x = this.width/2;
        this.icon.y = this.height/2;
        this.addChild(this.icon );

    }

    public giveVFX(){
        var color:number = 0xffffff;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
        strength, quality, inner, knockout );
       
       //颜色矩阵数组
        var colorMatrix = [
            1,0,0,0,100,
            0,1,0,0,100,
            0,0,1,0,100,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.icon.filters = [glowFilter,colorFlilter];

    }

    public clearVFX(){
        this.icon.filters = [];
    }

}