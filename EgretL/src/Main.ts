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
    private createGameScene() {
        var bg:egret.Shape = new egret.Shape;
        bg.graphics.beginFill(0x3384b3,1);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);

        var jieGeng:egret.Bitmap = new egret.Bitmap(RES.getRes("JieGeng"));
        this.divideImgRes(jieGeng);
    }

    private divideImgRes(img:egret.Bitmap){
        var dImgW = img.width/4;
        var dImgH = img.height/4;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var renderTexture: egret.RenderTexture = new egret.RenderTexture(); 
                renderTexture.drawToTexture(img,new egret.Rectangle(i*dImgW,j*dImgH,dImgH,dImgH)); 
                var jieGeng1:egret.Bitmap = new egret.Bitmap(renderTexture);
                jieGeng1.x = (i*dImgW+10);
                jieGeng1.y = (j*dImgH+10);
                this.addChild(jieGeng1);
                jieGeng1.touchEnabled = true;
                jieGeng1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                jieGeng1.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            }
        }
    }

    private _touchStatus:boolean = false;
    private _distance:egret.Point = new egret.Point();
    private mouseDown(evt:egret.TouchEvent ):void{
        var target = evt.currentTarget;
        this._touchStatus = true;
        this._distance.x = evt.stageX - target.x;
        this._distance.y = evt.stageY - target.y;
        target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent){
         var target = evt.currentTarget;
        if( this._touchStatus )
        {
            target.x = evt.stageX - this._distance.x;
            target.y = evt.stageY - this._distance.y;
        }
    }

    private mouseUp(evt:egret.TouchEvent ):void{
        this._touchStatus = false;
        var target = evt.currentTarget;
        target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }
    
    private _iTouchCollideStatus:number;
    private _bShapeTest:boolean;

    private touchHandler(evt:egret.TouchEvent):void{
        var text:egret.TextField = evt.currentTarget;
        text.textColor = 0x00ff00;
    }
    private checkHit(target:egret.Bitmap,source:egret.Bitmap){
       var  rect1= new egret.Rectangle(target.x,target.y,target.width,target.height);

       var rect2= new egret.Rectangle(source.x,source.y,source.width,source.height);
      console.log( rect1.intersects (rect2));
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