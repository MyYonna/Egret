//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
///<reference path="RectInfo.ts"/>
const APP_BG_COLOR: number = 0x87A09D;//小程序的背景颜色
const PF_BG_COLOR:number = 0xC7C7C7;//相框背景颜色
const PF_BR_COLOR:number = 0x0C0C0C;//相框边框
const PF_BR_WIDTH:number = 10;
class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("heros", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private times:number;
    private jieGeng:egret.Bitmap;
    private createGameScene() {
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg:egret.Shape = new egret.Shape;
        bg.graphics.beginFill(APP_BG_COLOR,1);//设置APP背景
       
        bg.graphics.drawRect(0,0,stageWidth,stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);


        //获取文件资源
        this.jieGeng = new egret.Bitmap(RES.getRes("JieGeng"));
        var jieGeng:egret.Bitmap = this.jieGeng;

        var photoFrame:egret.Shape = new egret.Shape();
        var photoFrameW = stageWidth-100;
        var photoFrameH = photoFrameW;
        photoFrame.graphics.beginFill( PF_BG_COLOR, 1);//设置相框背景
        //重新设置锚点
        photoFrame.anchorOffsetX = photoFrameW/2;
        photoFrame.anchorOffsetY = photoFrameH/2;
        photoFrame.graphics.lineStyle(PF_BR_WIDTH,PF_BR_COLOR);//设置相框的边框
        photoFrame.graphics.drawRect( stageWidth/2,stageHeight/2,photoFrameW,photoFrameH);
        photoFrame.graphics.endFill();

        var jieGengW = jieGeng.width;
        var jieGengH = jieGeng.height
        jieGeng.anchorOffsetX = jieGengW/2;
        jieGeng.anchorOffsetY = jieGengH/2;
        jieGeng.x = stageWidth/2;
        jieGeng.y = stageHeight/2;
        // jieGeng.scale9Grid = new egret.Rectangle( 20,20,jieGengW,jieGengH );

        this.addChild(photoFrame);
        this.addChild(jieGeng);
        //为图片加上touch事件
        jieGeng.touchEnabled = true;
        jieGeng.addEventListener(egret.TouchEvent.TOUCH_TAP,this.imageTouchListener,this);
    }

    private imageTouchListener(evt:egret.TouchEvent){
        //将文件资源进行等分
        var target =  evt.currentTarget;
        this.removeChild(target);
        this.divideImgRes(target);
    }
    //将文件划分成4*4的矩阵
    private sub_imgs:egret.Bitmap[] = [];
    private sub_rects:egret.Rectangle[] = [];
    private divideImgRes(img:egret.Bitmap){
        var dImgW = img.width/4;
        var dImgH = img.height/4;
        var _distanceX = (this.stage.stageWidth-img.width)/2;
         var _distanceY = (this.stage.stageHeight-img.height)/2;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(i==3&&j==3){
                    break;
                }
                var renderTexture: egret.RenderTexture = new egret.RenderTexture(); 
                renderTexture.drawToTexture(img,new egret.Rectangle(i*dImgW,j*dImgH,dImgW,dImgH)); 
                var sub_img:egret.Bitmap = new egret.Bitmap(renderTexture);
                sub_img.x = _distanceX+(i*(dImgW+2));
                sub_img.y = _distanceY+(j*(dImgH+2));

                this.addChild(sub_img);
                sub_img.touchEnabled = true;
                sub_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                sub_img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

                var sub_rect= new egret.Rectangle(sub_img.x,sub_img.y,sub_img.width,sub_img.height);
                this.sub_rects.push(sub_rect);
                this.sub_imgs.push(sub_img);
            }
        }
    }
    //鼠标按下,使目标图像处于最高深度，得到鼠标按下的位置与图像的起始位置的偏移
    private _touchStatus:boolean = false;
    private _distance:egret.Point = new egret.Point();
    private target:egret.Bitmap;
    private mouseDown(evt:egret.TouchEvent ):void{
        this.target = evt.currentTarget;
        this.setChildIndex(this.target, this.numChildren - 1);
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.target.x;
        this._distance.y = evt.stageY - this.target.y;
    }
    //移动鼠标
    private mouseMove(evt:egret.TouchEvent){
        //console.log(Date.parse(new Date().toString()) )
        var target = this.target;
        var moveY:number = evt.stageY;
        var moveX:number = evt.stageX;
        var oldRx;
        var oldRy;
        if(Math.abs(moveY-(this._distance.y+target.y))>Math.abs(moveX-(this._distance.x+target.x))){
            moveX = this._distance.x+target.x;
        }else{
            moveY = this._distance.y+target.y;
        }
        //当按下了屏幕，循环已经存在的图像列表，遍历，判定是否重叠。
        if( this._touchStatus )
        {
            var targetRect:egret.Rectangle;
            var sourceRect:egret.Rectangle;
            var flag = true;
            for(var i=0;i<this.sub_imgs.length;i++){
                if(this.sub_imgs[i] != target){
                    sourceRect = this.sub_rects[i];
                    if(targetRect!=null){
                        console.log(this.checkHit(targetRect,sourceRect))
                        if(this.checkHit(targetRect,sourceRect)){
                            flag = false;
                            break;
                        }
                    }
                }else{
                    targetRect = this.sub_rects[i];
                    oldRx = targetRect.x;
                    oldRy = targetRect.y;
                    targetRect.x = moveX - this._distance.x;
                    targetRect.y = moveY - this._distance.y;
                    i=0;
                }
            }
            if(flag){
                target.x = moveX - this._distance.x;
                target.y = moveY - this._distance.y;
            }else{
                this._touchStatus = false;
                targetRect.x = oldRx;
                targetRect.y = oldRy;
            }
        }
       // console.log(new Date().toString())
    }
    //鼠标弹起
    private mouseUp(evt:egret.TouchEvent ):void{
        this._touchStatus = false;
    }
    
    private _iTouchCollideStatus:number;
    private _bShapeTest:boolean;


    private checkHit(targetRect:egret.Rectangle,sourceRect:egret.Rectangle):boolean{
      return targetRect.intersects(sourceRect);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}