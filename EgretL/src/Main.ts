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
const APP_BG_COLOR: number = 0x87A09D;//小程序的背景颜色
const PF_BG_COLOR:number = 0xC7C7C7;//相框背景颜色
const PF_BR_COLOR:number = 0x0C0C0C;//相框边框
const PF_BR_WIDTH:number = 10;

const APP_NEXT_STATION:string = "next_station";
const APP_WAIT_STASTIC:string = "wait_stastic";
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            await RES.loadGroup("icons", 0, loadingView);

            await this.loadTheme();
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private times:number;
    private jieGeng:egret.Bitmap;
    private createGameScene() {
        //背景
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg:egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(APP_BG_COLOR,1);//设置APP背景
       
        bg.graphics.drawRect(0,0,stageWidth,stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);

        var photoFrame:egret.Sprite = new PhotoFrame(bg);
        var photo:egret.Sprite = new Photo(photoFrame);
        photo.addEventListener(CompleteEvent.Result,this.CompleteStation,this);
    }

    private _iTouchCollideStatus:number;
    private _bShapeTest:boolean;

    //拼图完成后，接收事件，并进行处理
    private CompleteStation(evt:CompleteEvent){
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        //创建一个弹窗的蒙版
        var mask:egret.Sprite = new egret.Sprite();
        mask.graphics.beginFill(APP_BG_COLOR,0.6);//设置APP背景
        mask.graphics.drawRect(0,0,stageWidth,stageHeight);
        mask.graphics.endFill();
        this.addChild(mask);
        //在此遮罩上创建下一关按钮
        this.createNextIcon(mask);
        var wait_panel = new eui.Panel();
        wait_panel.title = "破关";
        wait_panel.horizontalCenter = 0;
        wait_panel.verticalCenter = 0;
        wait_panel.elementsContent = [];
        
        this.addChild(wait_panel);
        
        var contentArea:eui.Group = new eui.Group();
        
        var wait_stastic:egret.Bitmap = this.createBitmapByName(APP_WAIT_STASTIC);
        var ratio = (wait_panel.width)/wait_stastic.width;
        wait_stastic.scaleX = ratio;
        wait_stastic.scaleY = ratio;
        wait_stastic.x = 0;
        wait_stastic.y = 0;
        contentArea.addChild(wait_stastic);

        var next_button:eui.Button = new eui.Button();
        next_button.label = "下一关";
        next_button.width = 100;
        next_button.x = wait_panel.width-next_button.width;
        next_button.y = wait_stastic.height * ratio;
        contentArea.addChild(next_button);
        next_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextListener,this);
       
        var redo_button:eui.Button = new eui.Button();
        redo_button.label = "重玩";
        redo_button.width = 100;
        redo_button.x = 0;
        redo_button.y = wait_stastic.height * ratio;
        contentArea.addChild(redo_button);
        redo_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.redoListener,this);

        contentArea.layout = new eui.BasicLayout();
        contentArea.width = wait_panel.width;
        contentArea.height = next_button.height+wait_stastic.height * ratio+wait_panel.moveArea.height;
        contentArea.x = 0;
        contentArea.y = wait_panel.moveArea.height;
        wait_panel.elementsContent = [contentArea];
        wait_panel.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            this.removeChild(mask);
        },this);
       

    }
    //重新开始
    private redoListener(){
            this.removeChildren();
            this.createGameScene();
    }
    //下一个
    private nextListener(){
            this.removeChildren();
            this.createGameScene();
    }
    //创建下一个按钮
    private createNextIcon(mask){
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        //添加一个下一关的按钮，并注册监听
        var next_station:egret.Bitmap = this.createBitmapByName(APP_NEXT_STATION);
        next_station.scaleX = 0.1;
        next_station.scaleY = 0.1;
        next_station.x = stageWidth - (next_station.width*next_station.scaleX+50);
        next_station.y = stageHeight - (next_station.height*next_station.scaleY+50);
        next_station.touchEnabled = true;
        next_station.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            next_station.scaleX = 0.15;
            next_station.scaleY = 0.15;
            next_station.x = stageWidth - (next_station.width*next_station.scaleX+50);
            next_station.y = stageHeight - (next_station.height*next_station.scaleY+50);
            this.nextListener();
        },this)
        next_station.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            next_station.scaleX = 0.1;
            next_station.scaleY = 0.1;
            next_station.x = stageWidth - (next_station.width*next_station.scaleX+50);
            next_station.y = stageHeight - (next_station.height*next_station.scaleY+50);
        },this)
        mask.addChild(next_station);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    
    private textfield: egret.TextField;
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