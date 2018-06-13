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
var bet_buffer:number = 0;
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


    public gameDisc:GameDisc;
    public rightPanel:RightPanel;
    public history:FruitHistory;
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
        bg.graphics.beginFill(0x1194a8);
        bg.graphics.drawRect(0,0,stageW,stageH);
        bg.graphics.endFill();
        this.addChild(bg);

       this.history = new FruitHistory();
       this.addChild(this.history);

       this.gameDisc = new GameDisc();
       this.addChild(this.gameDisc);

       this.rightPanel = new RightPanel();
       this.addChild(this.rightPanel);
    

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

}