class Photo extends egret.Sprite {
    private container: egret.Sprite;
    private pimg: egret.Bitmap;
    private res:string;
    public constructor(stage: egret.Sprite,res:string) {
        super();
        this.container = stage;
        this.res = res;
        this.drawPhoto();
    }
    private main_rect:egret.Rectangle;
    private async drawPhoto() {
        //加载图片
        await RES.getResAsync(this.res);
        this.pimg = new egret.Bitmap(RES.getRes(this.res));
        var scale =   this.pimg.width >  this.pimg.height?(this.container.width - 40) / this.pimg.width:(this.container.height - 40) / this.pimg.height;
        //为整张图片适配预定义的相框，得到缩放比
        this.pimg.width = this.pimg.width * scale;
        this.pimg.height = this.pimg.height * scale;
        this.pimg.anchorOffsetX = this.pimg.width / 2;
        this.pimg.anchorOffsetY = this.pimg.height / 2;

        this.pimg.x = (this.container.width) / 2;
        this.pimg.y = (this.container.height) / 2;
        this.container.addChild(this.pimg);
        // jieGeng.scale9Grid = new egret.Rectangle( 20,20,jieGengW,jieGengH );
        //为图片加上touch事件
        this.pimg.touchEnabled = true;
        this.pimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imageTouchListener, this);
    }

    private imageTouchListener(evt: egret.TouchEvent) {
        //将文件资源进行等分
        var target:egret.Bitmap = evt.currentTarget;
    
        let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        let fragmentSrc1 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform vec2 center;",
            "uniform vec3 params;", // 10.0, 0.8, 0.1"
            "uniform float time;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float dist = distance(uv, center);",

            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",

            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",

            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");

        
        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                center: { x: evt.localX/target.width, y: evt.localY / target.height },
                params: { x: 10, y: 0.8, z: 0.1 },
                time: 0
            }
        );

        var that = this;
        target.filters = [customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter1.uniforms.time += 0.02;
            if (customFilter1.uniforms.time > 0.5) {
                // customFilter1.uniforms.time = 0.0;
                //帧播放完成后则拆分图像
                if( target.parent )
                {
                     that.container.removeChild(target);
                    //  that.container.setChildIndex(target,-1);
                     that.divideImgRes(target);
                }
            }
        }, this);

    }

    //将文件划分成4*4的矩阵
    private sub_imgs: egret.Bitmap[] = [];
    private origin_sub_rects:egret.Rectangle[] = [];
    private sub_rects: egret.Rectangle[] = [];
    private divideImgRes(img: egret.Bitmap) {
        var dImgW = img.width / 4;
        var dImgH = img.height / 4;
        var _distanceX = (this.container.width - img.width) / 2;
        var _distanceY = (this.container.height - img.height) / 2;
        this.main_rect = new egret.Rectangle( _distanceX,  _distanceY,  this.pimg.width+2*4,  this.pimg.height+2*4);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //将最后的一张图片不显示

                var renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(img, new egret.Rectangle(i * dImgW, j * dImgH, dImgW, dImgH));
                var sub_img: egret.Bitmap = new egret.Bitmap(renderTexture);
                sub_img.x = _distanceX + (i * (dImgW + 2));
                sub_img.y = _distanceY + (j * (dImgH + 2));
                if (i == 3 && j == 3) {
                    this.sub_imgs.push(sub_img);
                    break;
                }
                this.container.addChild(sub_img);
                //为图片添加鼠标事件
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                //将图片的包围盒保存起来，用于后期做碰撞检测
                var sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                var origin_sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
                this.origin_sub_rects.push(origin_sub_rect);
            }
        }
                 //如果只放在小图片上加touch结束监听，则在空白地方无法触发
                 this.container.touchEnabled = true;
                //  this.exchangeMoveSubImg(0);
    }
    //鼠标按下,使目标图像处于最高深度，得到鼠标按下的位置与图像的起始位置的偏移
    private _touchStatus: boolean = false;
    private _distance: egret.Point = new egret.Point();
    private target: egret.Bitmap;
    private steps:number = 0;
    private stepsField:egret.TextField;
    private mouseDown(evt: egret.TouchEvent): void {
        this.target = evt.currentTarget;
        this.container.setChildIndex(this.target, this.container.numChildren - 1);
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.target.x;
        this._distance.y = evt.stageY - this.target.y;
        this.container.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    }
    //移动鼠标
    private mouseMove(evt: egret.TouchEvent) {
    }
    //鼠标弹起
    
    private mouseUp(evt: egret.TouchEvent): void {
        this.container.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.steps++;
        var target = this.target;
        var moveY: number = evt.stageY;
        var moveX: number = evt.stageX;
        var ifX = false;//是否是水平移动
        var moveDistance = 0;
        //需要判断是哪个轴的移动
        if (this._touchStatus) {
            if (Math.abs(moveY - (this._distance.y + target.y)) > Math.abs(moveX - (this._distance.x + target.x))) {
                ifX = false;
                if ((moveY - (this._distance.y + target.y)) > 0) {
                    //说明是往Y正方向移动
                    moveDistance = this.pimg.height / 4 + 2;
                } else {
                    //说明是往Y负方向移动
                      moveDistance = - (this.pimg.height / 4 + 2);
                   
                }
            } else if (Math.abs(moveY - (this._distance.y + target.y)) < Math.abs(moveX - (this._distance.x + target.x))) {
                if ((moveX - (this._distance.x + target.x)) > 0) {
                    //说明是往X正方向移动
                     moveDistance = this.pimg.width / 4 + 2
                } else {
                    //说明是往X负方向移动
                     moveDistance = - (this.pimg.width / 4 + 2)
                }
                ifX = true;
            } else {
                this._touchStatus = false;
                return;
            }
            //新建一个移动后的包围盒，并与除自身以外的其他已存在包围盒进行碰撞检测
            var sourceRect:egret.Rectangle;
            var targetRect:egret.Rectangle;
            var targetIndex:number;
            if (ifX) {
                targetRect = new egret.Rectangle(target.x + moveDistance, target.y, target.width, target.height);
                for(var i=0;i<this.sub_imgs.length;i++){
                    if(this.sub_imgs[i]!= target){
                        sourceRect = this.sub_rects[i];
                            if (this.checkHit(targetRect, sourceRect)) {
                                //如果存在碰撞则返回，不执行下面的状态更新代码
                                return;
                            }
                    }else{
                        targetIndex = i;//获得当前目标的包围盒索引
                    }
                }
                //更新当前目标的包围盒的坐标与目标坐标匹配
                this.sub_rects[targetIndex].x = this.sub_rects[targetIndex].x+moveDistance;
                egret.Tween.get(target).to({ x:target.x + moveDistance}, 500); //建立一个坐标移动的动画
            } else {
                targetRect = new egret.Rectangle(target.x, target.y+moveDistance, target.width, target.height);
                for(var i=0;i<this.sub_imgs.length;i++){
                    if(this.sub_imgs[i]!= target){
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            return;
                        }
                    }else{
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].y = this.sub_rects[targetIndex].y+moveDistance;
                egret.Tween.get(target).to({ y:target.y + moveDistance}, 500); 
            }
             this.stepsField = new egret.TextField();
             this.stepsField.text = this.steps+"";
             this.stepsField.size = 30;
             this.stepsField.textColor = 0x000000;
             this.stepsField.x = 50;
             this.stepsField.y = 100;
             this.container.parent.addChild(this.stepsField);

            if(this.ifFinishExchange(this.sub_rects,this.origin_sub_rects)){
                var that = this;
                setTimeout(function(){
                    var completeEvent:CompleteEvent = new CompleteEvent(CompleteEvent.Result,that.steps);
                    //将图片的位置向左挪动，形成一张完整的大图。。。
                    for(var i=0;i<that.sub_imgs.length;i++){
                        var t = i/4;
                        var j = i%4;
                        if(!that.sub_imgs[i].parent){
                            that.container.addChild(that.sub_imgs[i]);
                        }
                        egret.Tween.get(that.sub_imgs[i]).to({ y:that.sub_imgs[i].y-2*j,x:that.sub_imgs[i].x-2*t}, 500); 
                    }
                    //发送要求事件
                    that.dispatchEvent(completeEvent);
                },500)

            }
        }
       
        this._touchStatus = false;
    }
    private checkHit(targetRect: egret.Rectangle, sourceRect: egret.Rectangle): boolean {
        if(targetRect!=null&&sourceRect!=null){
            return targetRect.intersects(sourceRect) || !this.main_rect.containsRect(targetRect);
        }
        return false;
    }
    /**
     * 交换已存在的img及其包围盒，已达到打乱顺序的目的
     */
    private exchangeMoveSubImg(i:number){
            var targetIndex = Math.floor(Math.random() * 15);
            var bridgeX:number,bridgeY:number;
            bridgeX = this.sub_imgs[i].x;
            bridgeY = this.sub_imgs[i].y;
            this.container.setChildIndex(this.sub_imgs[i],this.container.numChildren);
            egret.Tween.get(this.sub_imgs[i]).to({ x:this.sub_imgs[targetIndex].x,y:this.sub_imgs[targetIndex].y}, 500);
            this.container.setChildIndex(this.sub_imgs[targetIndex],this.container.numChildren);
            egret.Tween.get(this.sub_imgs[targetIndex]).to({ x:bridgeX,y:bridgeY}, 500);

            this.sub_rects[i].x = this.sub_rects[targetIndex].x;
            this.sub_rects[i].y = this.sub_rects[targetIndex].y;
            this.sub_rects[targetIndex].x = bridgeX;
            this.sub_rects[targetIndex].y = bridgeY;
            var that= this;
            if(i<14){
                setTimeout(function() {
                    that.exchangeMoveSubImg(++i);
                }, 500);
            }

    }
    /**
     * 判断图像是否完全复位
     */
    private ifFinishExchange(sub_rects:egret.Rectangle[],origin_sub_rects:egret.Rectangle[]):boolean{
        for(var i=0;i<sub_rects.length;i++){
            if(sub_rects[i].x != origin_sub_rects[i].x || sub_rects[i].y != origin_sub_rects[i].y){
                return false;
            }
        }
        return true;
    }
}