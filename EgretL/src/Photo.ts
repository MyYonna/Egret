class Photo extends egret.DisplayObjectContainer {
    private pimg: egret.Bitmap;
    private res:string;
    public constructor(res:string) {
        super();
        this.res = res;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }
    private main_rect:egret.Rectangle;
    public async render() {
        //加载图片
        await RES.getResAsync(this.res);
        this.pimg = new egret.Bitmap(RES.getRes(this.res));
        var scale =   this.pimg.width >  this.pimg.height?(this.parent.width-40) / this.pimg.width:(this.parent.height-40 )/ this.pimg.height;
        //为整张图片适配预定义的相框，得到缩放比
        this.pimg.width = this.pimg.width * scale;
        this.pimg.height = this.pimg.height * scale;
        this.pimg.anchorOffsetX =  this.pimg.width /2;
        this.pimg.anchorOffsetY =  this.pimg.height /2;

        //设置本容器的属性
        this.width = this.pimg.width+4;
        this.height = this.pimg.height+4;

        this.pimg.x = this.width/2;
        this.pimg.y = this.height/2;
        //重新设置锚点
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.x = this.parent.width/2;
        this.y = this.parent.height/2;
        //为本容器加入背景组件
        let photoBg = new egret.Shape();
        photoBg.graphics.beginFill( 0xffffff, 1);//设置相框背景
        photoBg.graphics.lineStyle(1,PF_BR_COLOR);//设置相框的边框
        photoBg.graphics.drawRect( 0,0,this.width,this.height);
        photoBg.graphics.endFill();
        this.addChild(photoBg);
        this.addChild(this.pimg);
        //为图片加上touch事件
        this.pimg.touchEnabled = true;
        this.pimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imageTouchListener, this);
        //步数显示
        this.stepsField = new egret.TextField();
        this.stepsField.text = this.steps+"";
        this.stepsField.size = 50;
        this.stepsField.textColor = 0x000000;
        this.stepsField.x = 50;
        this.stepsField.y = 100;
        this.parent.parent.addChild(this.stepsField);
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
                     target.parent.removeChild(target);
                     this.divideImgRes(target);
                }
            }
        }, this);

    }

    //将文件划分成4*4的矩阵
    private sub_imgs: egret.Bitmap[] = [];
    private origin_sub_rects:egret.Rectangle[] = [];
    private sub_rects: egret.Rectangle[] = [];
    private divideImgRes(img: egret.Bitmap) {
        this.resetPhoto(true);
        var dImgW = img.width / 4;
        var dImgH = img.height / 4;
        this.main_rect = new egret.Rectangle( 0,  0,  this.width,  this.height);//对移动的外围进行限定
        let random_i = Math.floor(Math.random()*4);
        let random_j = Math.floor(Math.random()*4);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(img, new egret.Rectangle(i * dImgW, j * dImgH, dImgW, dImgH),1);
                var sub_img: egret.Bitmap = new egret.Bitmap(renderTexture);
                sub_img.x =  (i * (dImgW + 2))+2;
                sub_img.y =  (j * (dImgH + 2))+2;
                //将图片的包围盒保存起来，用于后期做碰撞检测

                if (i == random_i && j == random_j) {
                    this.sub_rects.push(null);
                    this.sub_imgs.push(sub_img);
                    this.origin_sub_rects.push(null);
                    continue;
                }
                this.addChild(sub_img);
                var sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                var origin_sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
                this.origin_sub_rects.push(origin_sub_rect);
                //为图片添加鼠标事件
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            }
        }
                 //如果只放在小图片上加touch结束监听，则在空白地方无法触发
                 this.touchEnabled = true;
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
        this._touchStatus = true;
        this._distance.x = evt.stageX-this.x - this.target.x;
        this._distance.y = evt.stageY-this.y - this.target.y;
    }
    //鼠标弹起
    
    private mouseUp(evt: egret.TouchEvent): void {
        var target = this.target;
        var moveY: number = evt.stageY;
        var moveX: number = evt.stageX;
        var ifX = false;//是否是水平移动
        var moveDistance = 0;
        //需要判断是哪个轴的移动
        if (this._touchStatus) {
            if (Math.abs(moveY - (this._distance.y + target.y+this.y)) > Math.abs(moveX - (this._distance.x + target.x+this.x))) {
                ifX = false;
                if ((moveY - (this._distance.y + target.y+this.y)) > 0) {
                    //说明是往Y正方向移动
                    moveDistance = this.pimg.height / 4 + 2; 
                } else {
                    //说明是往Y负方向移动
                    moveDistance = - (this.pimg.height / 4 + 2);
                   
                }
            } else if (Math.abs(moveY - (this._distance.y + target.y+this.y)) < Math.abs(moveX - (this._distance.x + target.x+this.x))) {
                if ((moveX - (this._distance.x + target.x+this.x)) > 0) {
                    //说明是往X正方向移动
                     moveDistance = this.pimg.width / 4 + 2;
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
            this.steps++;
            if (ifX) {
                targetRect = new egret.Rectangle(target.x + moveDistance, target.y, target.width, target.height);
                for(var i=0;i<this.sub_imgs.length;i++){
                    if(this.sub_imgs[i]!= target){
                        sourceRect = this.sub_rects[i];
                            if (this.checkHit(targetRect, sourceRect)) {
                                //如果存在碰撞则返回，不执行下面的状态更新代码
                                this.steps--;
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
                            this.steps--;
                            return;
                        }
                    }else{
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].y = this.sub_rects[targetIndex].y+moveDistance;
                egret.Tween.get(target).to({ y:target.y + moveDistance}, 500); 
            }
            this.stepsField.text = this.steps+"";//步数加1

            if(this.ifFinishExchange(this.sub_rects,this.origin_sub_rects)){
                var that = this;
                setTimeout(function(){
                    that.resetPhoto(false);
                    var completeEvent:CompleteEvent = new CompleteEvent(CompleteEvent.Result,that.steps);
                    //将图片的位置向左挪动，形成一张完整的大图。。。
                    for(let i=0;i<that.sub_imgs.length;i++){
                        var t = Math.floor(i/4);
                        var j = i%4;
                        that.sub_imgs[i].touchEnabled = false;;
                        if(!that.sub_imgs[i].parent){
                            that.addChild(that.sub_imgs[i]);
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
    //碰撞检测
    private checkHit(targetRect: egret.Rectangle, sourceRect: egret.Rectangle): boolean {
        if(targetRect!=null&&sourceRect!=null){
            return targetRect.intersects(sourceRect) || !this.main_rect.containsRect(targetRect);
        }
        return false;
    }
    //重置容器属性
    private resetPhoto(flag:boolean){
        //重新设置本容器的属性
        this.width = flag?this.pimg.width+2*3+4:this.pimg.width+4;
        this.height =  flag?this.pimg.height+2*3+4:this.pimg.height+4;
        //重新重新设置锚点
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.x = this.parent.width/2;
        this.y = this.parent.height/2;
        //重新设置相片边界
        this.removeChildAt(0);
        let photoBg = new egret.Shape();
        photoBg.graphics.beginFill( 0xffffff, 1);//设置相框背景
        photoBg.graphics.lineStyle(1,PF_BR_COLOR);//设置相框的边框
        photoBg.graphics.drawRect( 0,0,this.width,this.height);
        photoBg.graphics.endFill();
        this.addChild(photoBg);
        this.setChildIndex(photoBg,0);
    }
    /**
     * 交换已存在的img及其包围盒，已达到打乱顺序的目的
     */
    private exchangeMoveSubImg(i:number){
            var targetIndex = Math.floor(Math.random() * 15);
            var bridgeX:number,bridgeY:number;
            bridgeX = this.sub_imgs[i].x;
            bridgeY = this.sub_imgs[i].y;
            this.setChildIndex(this.sub_imgs[i],this.parent.numChildren);
            egret.Tween.get(this.sub_imgs[i]).to({ x:this.sub_imgs[targetIndex].x,y:this.sub_imgs[targetIndex].y}, 500);
            this.setChildIndex(this.sub_imgs[targetIndex],this.parent.numChildren);
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
            if(sub_rects[i] != null && origin_sub_rects[i] != null){
                if(sub_rects[i].x != origin_sub_rects[i].x || sub_rects[i].y != origin_sub_rects[i].y){
                    return false;
                }
            }
        }
        return true;
    }
}