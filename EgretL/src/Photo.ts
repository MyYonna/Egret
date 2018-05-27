class Photo extends egret.Sprite {
    private container: egret.Sprite;
    private pimg: egret.Bitmap;
    public constructor(stage: egret.Sprite) {
        super();
        this.container = stage;
        this.drawPhoto();
    }
    private main_rect:egret.Rectangle;
    private drawPhoto() {
        //加载图片
        this.pimg = new egret.Bitmap(RES.getRes("JieGeng"));
        var scale = (this.container.width - 40) / this.pimg.width;
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
        var target = evt.currentTarget;
        this.container.removeChild(target);
        this.divideImgRes(target);
    }

    //将文件划分成4*4的矩阵
    private sub_imgs: egret.Bitmap[] = [];
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
                if (i == 3 && j == 3) {
                    break;
                }
                var renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(img, new egret.Rectangle(i * dImgW, j * dImgH, dImgW, dImgH));
                var sub_img: egret.Bitmap = new egret.Bitmap(renderTexture);
                sub_img.x = _distanceX + (i * (dImgW + 2));
                sub_img.y = _distanceY + (j * (dImgH + 2));

                this.container.addChild(sub_img);
                //为图片添加鼠标事件
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                //将图片的包围盒保存起来，用于后期做碰撞检测
                var sub_rect = new egret.Rectangle(sub_img.x, sub_img.y, sub_img.width, sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
            }
        }
                 //如果只放在小图片上加touch结束监听，则在空白地方无法触发
                 this.container.touchEnabled = true;
    }
    //鼠标按下,使目标图像处于最高深度，得到鼠标按下的位置与图像的起始位置的偏移
    private _touchStatus: boolean = false;
    private _distance: egret.Point = new egret.Point();
    private target: egret.Bitmap;
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
            var sourceRect:egret.Rectangle;
            var targetRect:egret.Rectangle;
            var targetIndex:number;
            if (ifX) {
                targetRect = new egret.Rectangle(target.x + moveDistance, target.y, target.width, target.height);
                for(var i=0;i<this.sub_imgs.length;i++){
                    if(this.sub_imgs[i]!= target){
                        sourceRect = this.sub_rects[i];
                console.log(targetRect.intersects(sourceRect))
                            if (this.checkHit(targetRect, sourceRect)) {
                                return;
                            }
                    }else{
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].x = this.sub_rects[targetIndex].x+moveDistance;
                egret.Tween.get(target).to({ x:target.x + moveDistance}, 500); 
                target.x = target.x + moveDistance;
            } else {
                targetRect = new egret.Rectangle(target.x, target.y+moveDistance, target.width, target.height);
                for(var i=0;i<this.sub_imgs.length;i++){
                    if(this.sub_imgs[i]!= target){
                        sourceRect = this.sub_rects[i];
                        if (this.checkHit(targetRect, sourceRect)) {
                            return;
                        }
                        this.sub_rects[i].y = this.sub_rects[i].y+moveDistance;
                    }else{
                        targetIndex = i;
                    }
                }
                this.sub_rects[targetIndex].y = this.sub_rects[targetIndex].y+moveDistance;
                egret.Tween.get(target).to({ y:target.y + moveDistance}, 500); 
                target.y = target.y + moveDistance;

            }
        }
       
        this._touchStatus = false;
    }
    private checkHit(targetRect: egret.Rectangle, sourceRect: egret.Rectangle): boolean {
        return targetRect.intersects(sourceRect) || !this.main_rect.containsRect(targetRect);
    }
}