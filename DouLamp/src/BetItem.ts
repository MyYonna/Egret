class BetItem extends egret.DisplayObjectContainer{
    private index:number;
    public icon:string;//图片资源字符串
    public turn_number:number;//翻倍数
    private header_color:number;
    private footer_color:number;
    public bet_num:number;//押注数
    public bet_text_num:egret.TextField;//押注数的文字狱
    public bet_item_icon:egret.Bitmap;//图片
    public constructor(betItemInfo:BetItemInfo){
         super();
         this.index = betItemInfo.index;
         this.turn_number = betItemInfo.turn_number;
         this.bet_num = betItemInfo.bet_number;
         this.icon = betItemInfo.icon;
         this.header_color = betItemInfo.header_color;
         this.footer_color = betItemInfo.footer_color;
         this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    public render(){
        this.width = 30;
        this.height = 70;
        this.x = this.width*this.index+3*(this.index+1);
        this.y = 3;
        //背景
        let bet_item_bg = new egret.Shape();
        bet_item_bg.graphics.beginFill(0xffffff);
        bet_item_bg.graphics.lineStyle(1,0x121212);
        bet_item_bg.graphics.drawRoundRect(0,0,this.width,this.height,1);
        bet_item_bg.graphics.endFill();
        this.addChild(bet_item_bg);
        //头部背景
        let bet_item_header = new egret.Shape();
        bet_item_header.graphics.beginFill(this.header_color);
        bet_item_header.graphics.lineStyle(1,0x121212);
        bet_item_header.graphics.drawRoundRect(0,0,this.width ,this.height*0.25,1);
        bet_item_header.graphics.endFill();
        this.addChild(bet_item_header);
        //头部文字
        let bet = new egret.TextField();
        bet.text = this.turn_number+"";//翻倍数
        bet.textColor = 0x000000;
        bet.size =  bet_item_header.height-5;
        bet.width = this.width;
        bet.height = bet_item_header.height;
        bet.textAlign = egret.HorizontalAlign.CENTER;
        bet.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(bet);
        //中间图片
        this.bet_item_icon = new egret.Bitmap(RES.getRes(this.icon));
        this.bet_item_icon.width = this.height*0.3;
        this.bet_item_icon.height = this.height*0.3;
        this.bet_item_icon.anchorOffsetX = this.bet_item_icon.width/2;
        this.bet_item_icon.x = this.width/2;
        this.bet_item_icon.y = bet_item_header.height;
        this.addChild(this.bet_item_icon);
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this.bet_item_icon.scaleX = 1.1;
            this.bet_item_icon.scaleY = 1.1;
        },this)
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function(){
            this.bet_item_icon.scaleX = 1;
            this.bet_item_icon.scaleY = 1;
        },this)
        this.bet_item_icon.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this.bet_item_icon.scaleX = 1;
            this.bet_item_icon.scaleY = 1;
        },this)
        //押注数背景
        let bet_item_footer = new egret.Shape();
        bet_item_footer.graphics.beginFill(this.footer_color);
        bet_item_footer.graphics.lineStyle(1,0x121212);
        bet_item_footer.graphics.drawRoundRect(0,0,this.width,this.height*0.45 ,1);
        bet_item_footer.graphics.endFill();
        bet_item_footer.y = this.bet_item_icon.y+this.bet_item_icon.height;
        this.addChild(bet_item_footer);
        //点击押注数量
        this.bet_text_num = new egret.TextField();
        this.bet_text_num.text = this.bet_num+"";
        this.bet_text_num.textColor = 0xffffff;
        this.bet_text_num.size = bet_item_footer.width;
        this.bet_text_num.width = this.width;
        this.bet_text_num.height = bet_item_footer.height;
        this.bet_text_num.y = bet_item_footer.y;
        this.bet_text_num.textAlign = egret.HorizontalAlign.CENTER;
        this.bet_text_num.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.bet_text_num);

    }
    public giveVFX(){
        var color:number = 0xED3200;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.9;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
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
        this.filters = [glowFilter,colorFlilter];

    }
    //清空路径
    public clearVFX(){
        this.filters = [];
    }
}