const APP_BG_COLOR: number = 0x87A09D;//小程序的背景颜色
const PF_BG_COLOR:number = 0xC7C7C7;//相框背景颜色
const PF_BR_COLOR:number = 0x0C0C0C;//相框边框
const PF_BR_WIDTH:number = 10;

const APP_NEXT_STATION:string = "next_station";
const APP_WAIT_STASTIC:string = "wait_stastic";
const APP_BEGIN_SCENE:string = "begin_scene";
const APP_BEGIN_GAME:string = "begin_game_png";
const APP_RANK_BACK:string = "rank_back_png";
const APP_RANK_VIEW:string = "rank_view_png";
const APP_EXIT_OUT:string = "exit_out_png";
const APP_REFRESH_VIEW:string = "refresh_view_png"
const CURRENT_STATION_CHARACTER_PRE:string = "character_";
class Main extends egret.DisplayObjectContainer {
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private isdisplay:boolean;
    private rankUi:RankUI;
    private startingMain:StartingMain;
    private index:number = 1;
    private gameMain:GameMain;
    private openDataContext = wx.getOpenDataContext();
    private openid:string;
    private onAddToStage(): void {
        egret.lifecycle.addLifecycleListener((context) => {
             context.onUpdate = () => {}
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
        
    //运行游戏
    private async runGame() {
        this.checkUpdate();
        this.shareGame();
        await this.loadResource();
        await this.createBeginScene();
        //登录，获取用户信息
        const loginInfo =  await platform.login();
        const userInfo = await platform.getUserInfo();
        
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // //设置为 POST 请求
        // var params = "?code="+loginInfo.code;
        // request.open("http://flow.go.gionee.com/wx/checkLogin.json"+params,egret.HttpMethod.GET);
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.send();
        // request.addEventListener(egret.Event.COMPLETE,function(event:egret.Event){
        //     var request = <egret.HttpRequest>event.currentTarget;
        //     let response = JSON.parse(request.response);
        //     if(response.errcode){
        //         this.openid = "";
        //     }else{
        //         this.openid = response.openid;
        //     }

        // },this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR,function(){
        //      this.openid = "";
        // },this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS,function(){
        //      this.openid = "";
        // },this);
    }

    //加载资源文件和资源
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
    //创建开始场景
    private  createBeginScene(){
        //标题以及背景，底部
        this.startingMain = new StartingMain();
        this.addChild(this.startingMain);
        this.startingMain.render();
        this.startingMain.touchEnabled = false;
        this.touchEnabled = false;
        //开始游戏监听
        this.startingMain.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(){
            this.startingMain.startBtn.scaleX = 1.1;
            this.startingMain.startBtn.scaleY = 1.1;
            this.createGameScene();
        },this)
        this.startingMain.startBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this.startingMain.startBtn.scaleX = 1;
            this.startingMain.startBtn.scaleY = 1
        },this);

        this.startingMain.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.createScoreRank();//关数排行
        },this);

    }
    /**
     * 创建游戏场景
     */
    private createGameScene() {
        this.startingMain.btnRank.touchEnabled = false;
        //监听一个图像拼接完成事件
        this.gameMain = new GameMain(this.index); 
        this.addChild(this.gameMain);
        this.gameMain.render();
        //图片监听
        this.gameMain.photo.addEventListener(CompleteEvent.Result,function(e:CompleteEvent){
            console.log(e.steps)
            this.openDataContext.postMessage({
                update_step:true,
                cost_step:e.steps
            });
        },this);
        //排行榜
        this.gameMain.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.createScoreRank();
        },this);
        //刷新
        this.gameMain.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.removeChildren();
            this.index =  Math.floor(Math.random()*7+1);
            this.createGameScene();
        },this)
    }

    //创建排名
    private createScoreRank(){
        //开放数据
        if (this.isdisplay) {
            this.removeChildAt(this.numChildren-1);
            this.startingMain.btnRank.touchEnabled = true;
            this.isdisplay = false;
        } else {
            this.startingMain.btnRank.touchEnabled = false;
            this.rankUi = new RankUI();
            this.addChild(this.rankUi);
            this.rankUi.render();
            this.rankUi.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
                this.isdisplay = true;
                this.createScoreRank();
            },this);     
            this.isdisplay = true;
            //发送消息
            this.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                openid:this.openid 
            });


        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name: string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    //冷启动更新游戏
    private checkUpdate(){
        if (typeof wx.getUpdateManager === 'function') {
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(function() {
            // 请求完新版本信息的回调
        })

        updateManager.onUpdateReady(function () {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
        })

        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
        })
        }
    }

    private shareGame(){
        //显示转发按钮
        wx.showShareMenu({
            withShareTicket:false,
            success:res=>{},
            fail:res=>{},
            complete:res=>{}
            })
        //配置转发信息
        wx.onShareAppMessage(function () {
        // 用户点击了“转发”按钮
        return {
                title: '犬夜叉之角色拼图',
                desc: '日本战国时代，主要讲述的是初三女生日暮戈薇偶然通过自家神社的食骨之井穿越时空来到500年前的日本战国时代妖怪与人的混血半妖——犬夜叉，为寻找散落于各处的四魂之玉碎片而展开的冒险之旅',
        }
})
    }
}