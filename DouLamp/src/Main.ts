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
const ICON_COLOR:number[] = [0x1194A8,0xD89A14,0X589120];
const Fruit_Icons = ["Apple_png","Watermelon_png","Cocco_png","Seven_png","Chip_50_png","Chip_100_png","Banana_png","Lime_png","Arancia_png","Strawberry_png","Dice_png"]
const Fruit_Bet = [5,20,30,40,50,100,20,15,10,2];
const Fruit_Header_Color = [0xFB459A,0x92E02A,0x92E02A,0x92E02A,0xFB459A,0xFB459A,0x92E02A,0x92E02A,0x92E02A,0xFB459A];
const Fruit_Footer_Color = [0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d,0x5d1d1d]
const Fruit_Excute_Order = [0,1,2,3,4,5,6,8,10,12,14,16,23,22,21,20,19,18,17,15,13,11,9,7]
enum Fruit_ICON{
    Apple,
    Watermelon,
    Cocco,
    Seven,
    Chip_50,
    Chip_100,
    Banana,
    Lime,
    Arancia,
    Strawberry,
    Dice
}
class Main extends egret.DisplayObjectContainer {


    private gameDisc:GameDisc;
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
        const result = await RES.getResAsync("description_json")
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
    private createGameScene() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let bg = new egret.Shape();
        bg.graphics.beginFill(0x141414);
        bg.graphics.drawRect(0,0,stageW,stageH);
        bg.graphics.endFill();
        this.addChild(bg);

       let history = new FruitHistory();
       this.addChild(history);

       this.gameDisc = new GameDisc();
       this.addChild(this.gameDisc);

       let rightPanel = new RightPanel();
       this.addChild(rightPanel);
       rightPanel.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginMarquee,this);

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
    private i=0;
    private j=0;

    private beginMarquee(){
        this.j++;
        let that = this;
        this.i = this.i % 24;
        let fruitDiscIcon = this.gameDisc.fruitDiscIcons[Fruit_Excute_Order[this.i]];
        fruitDiscIcon.giveVFX();
        fruitDiscIcon.scaleX = 1.1;
        fruitDiscIcon.scaleY = 1.1;
        if(this.j>650){
            let sure_value = Math.round(Math.random()*650);
            let fruit_res = this.weatherFruit(sure_value);
            if(fruitDiscIcon.icon_res != fruit_res){
            }else{
                this.i = 0;
                this.j = 0;
                return;
            }
        }
        setTimeout(function() {
            fruitDiscIcon.scaleX = 1;
            fruitDiscIcon.scaleY = 1;
            fruitDiscIcon.clearVFX();
            that.i ++;
            that.beginMarquee();
        }, 20);
    }
    //633
    private weatherFruit(value:number):string{
        let fruit;
        if(value>(650-6)){
            fruit = Fruit_Icons[Fruit_ICON.Chip_100];
        }else if(value>(650-6-12)){
            fruit = Fruit_Icons[Fruit_ICON.Chip_50];
        }else if(value>(650-6-12-15)){
            fruit = Fruit_Icons[Fruit_ICON.Seven];
        }else if(value>(650-6-12-15-20)){
            fruit = Fruit_Icons[Fruit_ICON.Cocco];
        }else if(value>(650-6-12-15-20-30)){
            fruit = Fruit_Icons[Fruit_ICON.Watermelon];
        }else if(value>(650-6-12-15-20-30-120)){
            fruit = Fruit_Icons[Fruit_ICON.Apple];
        }else if(value>(650-6-12-15-20-30-120-300)){
            fruit = Fruit_Icons[Fruit_ICON.Strawberry];
        }else if(value>(650-6-12-15-20-30-120-300-60)){
            fruit = Fruit_Icons[Fruit_ICON.Arancia];
        }else if(value>(650-6-12-15-20-30-120-300-60-40)){
            fruit = Fruit_Icons[Fruit_ICON.Lime];
        }else if(value>(650-6-12-15-20-30-120-300-60-40-30)){
            fruit = Fruit_Icons[Fruit_ICON.Banana];
        }else{
             fruit = Fruit_Icons[Fruit_ICON.Dice];
        }
        return fruit;
    }
}