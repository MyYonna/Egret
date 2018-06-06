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
const CURRENT_STATION_CHARACTER_PRE:string = "character_";
class Main extends egret.DisplayObjectContainer {
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private bitmap:egret.Bitmap;
    private btnClose:egret.Bitmap;
    private btnRank:egret.Bitmap;
    private isdisplay:boolean;
    private rankingListMask:egret.Shape;
    private openDataContext = wx.getOpenDataContext();
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
        
    private openid:string;
    private async runGame() {
        await this.loadResource();
        await this.createBeginScene();
        //登录，获取用户信息
        const loginInfo =  await platform.login();
        const userInfo = await platform.getUserInfo();
        
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        var params = "?code="+loginInfo.code;
        request.open("http://flow.go.gionee.com/wx/checkLogin.json"+params,egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,function(event:egret.Event){
            var request = <egret.HttpRequest>event.currentTarget;
            let response = JSON.parse(request.response);
            if(response.errcode){
                this.openid = "";
            }else{
                this.openid = response.openid;
            }

        },this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,function(){
             this.openid = "";
        },this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,function(){
             this.openid = "";
        },this);
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
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var begin_scene = new egret.Bitmap(RES.getRes(APP_BEGIN_SCENE));
        var shape:egret.Sprite = new egret.Sprite();
        shape.graphics.beginFill(0x000000,0.8);
        shape.graphics.drawRoundRect(0,0,150,60,60,60);
        shape.graphics.endFill();
        shape.width = 150;
        shape.height = 60;
        shape.x = stageWidth-200;
        shape.y = stageHeight-120;
        var label:egret.TextField = new egret.TextField(); 
        label.text = "开始"; 
        label.textColor = 0xffffff;
        label.fontFamily = "KaiTi";
        label.size = 50;
        label.bold = true;
        label.italic = true;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;


        this.addChild(begin_scene);
        this.addChild(shape);
        shape.addChild( label );
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(){
            shape.scaleX = 1.2;
            shape.scaleY = 1.2;
            this.createGameScene();
        },this)
        shape.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            shape.scaleX = 1;
            shape.scaleY = 1
        },this);
        //排行榜查看按钮
        this.btnRank = new egret.Bitmap(RES.getRes(APP_RANK_VIEW));
        this.btnRank.height = 80;
        this.btnRank.width = 80;
        this.btnRank.x = this.stage.stageWidth * 0.1 - 10;
        this.btnRank.y = this.stage.stageHeight * 0.9 - 30;
        //简单实现，打开这关闭使用一个按钮。
        this.addChild(this.btnRank);
        this.btnRank.touchEnabled = true;
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.createScoreRank();
        },this);


    }
    /**
     * 创建游戏场景
     */
    private current_station_character_index:number = 1;
    private max_station_character_index:number = 0;
    private startX:number;
    private photoFrame:egret.Sprite;
    private photo:egret.Sprite;
    private createGameScene() {
        //背景
        this.btnRank.touchEnabled = false;
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg:egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(APP_BG_COLOR,1);//设置APP背景
       
        bg.graphics.drawRect(0,0,stageWidth,stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var that = this;
        this.photoFrame = new PhotoFrame(bg);
        this.photo = new Photo(this.photoFrame,CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index);
        //监听一个图像拼接完成事件
        this.photo.addEventListener(CompleteEvent.Result,function(e:CompleteEvent){
            that.max_station_character_index++;
            that.openDataContext.postMessage({
                update_max_station:true,
                max_station: that.max_station_character_index,
                steps:e.steps
            });
            that.touchEnabled = true;
            that.addEventListener(egret.TouchEvent.TOUCH_BEGIN,that.begin,that);
            that.addEventListener(egret.TouchEvent.TOUCH_END,that.end,that);
        },this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,that.begin,that);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,that.end,that);
        this.preview();

        let exitBtn = new egret.Bitmap(RES.getRes("exit_out_png"));
        exitBtn.x = this.stage.stageWidth-30-exitBtn.width;
        exitBtn.y = this.stage.stageHeight-30-exitBtn.height;
        exitBtn.touchEnabled = true;
        exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             wx.exitMiniProgram({
                 success:res=>{},
                 fail:res=>{},
                 complete:res=>{}
             })
        },this);
        this.addChild(exitBtn);

        let homeBtn = new egret.Bitmap(RES.getRes("page_home_png"));
        homeBtn.x = 30;
        homeBtn.y = this.stage.stageHeight-30-homeBtn.height;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            this.createBeginScene() 
        },this);
        this.addChild(homeBtn);
    }
    //创建排名
    private createScoreRank(){
        //开放数据
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.btnClose.parent && this.btnClose.parent.removeChild(this.btnClose);
            this.btnRank.touchEnabled = true;
            this.isdisplay = false;
        } else {
            this.btnRank.touchEnabled = false;
            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x686b72, 1);
            this.rankingListMask.graphics.drawRect(0, 1, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            // this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);

            // 将离屏的canvas生成图片，贴到主屏
            const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
            bitmapdata.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapdata);
            this.bitmap = new egret.Bitmap(texture);
            this.bitmap.width = this.stage.stageWidth;
            this.bitmap.height = this.stage.stageHeight;
            this.addChild(this.bitmap);
            // 画一个返回的按钮
            this.btnClose = new egret.Bitmap(RES.getRes(APP_RANK_BACK));
            this.btnClose.height = 80;
            this.btnClose.width = 80;
            this.btnClose.x = this.stage.stageWidth * 0.1 - 10;
            this.btnClose.y = this.stage.stageHeight * 0.9 - 30;
            //简单实现，打开这关闭使用一个按钮。
            this.addChild(this.btnClose);
            this.btnClose.touchEnabled = true;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
                this.isdisplay = true;
                this.createScoreRank();

            },this);
            egret.startTick((timeStarmp: number) => {
                egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                bitmapdata.webGLTexture = null;
                return false;
            }, this);
            //主要示例代码结束            
            this.isdisplay = true;
            // //发送消息
            this.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                openid:this.openid 
            });

        }
    }
    //舞台的滑动执行内部方法
    private begin(evt:egret.TouchEvent){
            this.startX = evt.localX;
    }
    private end(evt:egret.TouchEvent){
            var moveXZ = evt.localX>this.startX?true:false;
            if(evt.localX==this.startX||(!moveXZ&&this.current_station_character_index == 7) || (moveXZ&&this.current_station_character_index == 1)){
                if((moveXZ&&this.current_station_character_index == 1)){
                    this.removeChildren();
                    this.createBeginScene();
                }
                return;
            }
            if(moveXZ){
                this.preListener();   
            }else{
                this.nextListener()
            }
    }

    //重新开始
    private redoListener(){
            this.removeChildren();
            this.createGameScene();
    }
    //下一个
    private nextListener(){
            this.current_station_character_index++;
            this.removeChildren();
            this.createGameScene();
    }
    //下一个
    private preListener(){
            this.current_station_character_index--;
            this.removeChildren();
            this.createGameScene();
    }
    //预览完整的图
    private async preview(){
        await RES.getResAsync(CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index);
        var preview_img:egret.Bitmap = new egret.Bitmap(RES.getRes(CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index));
        var scale = preview_img.width>preview_img.height?preview_img.height/100:preview_img.width/100;
        preview_img.width = preview_img.width / scale;
        preview_img.height = preview_img.height / scale;
        preview_img.anchorOffsetX = preview_img.width/2;
        preview_img.anchorOffsetY = preview_img.height/2;
        preview_img.x = this.stage.stageWidth/2;
        preview_img.y = this.stage.stageHeight-100;
        this.addChild(preview_img);
        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0xffffff,1);
        circle.graphics.drawCircle(0,0,50);
        circle.graphics.endFill();

        circle.x = this.stage.stageWidth/2;
        circle.y = this.stage.stageHeight-100;
        preview_img.mask = circle;

        this.addChild(circle);

        preview_img.touchEnabled = true;
        var complete_img;
        preview_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(){
            preview_img.scaleX = 1.1;
            preview_img.scaleY = 1.1;
            circle.scaleX = 1.1;
            circle.scaleY = 1.1;

        // await RES.getResAsync(this.res);
        complete_img = new egret.Bitmap(RES.getRes(CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index));
        var scale =   complete_img.width >  complete_img.height?(this.photoFrame.width - 40) / complete_img.width:(this.photoFrame.height - 40) / complete_img.height;
        //为整张图片适配预定义的相框，得到缩放比
        complete_img.width = complete_img.width * scale;
        complete_img.height = complete_img.height * scale;
        complete_img.anchorOffsetX = complete_img.width / 2;
        complete_img.anchorOffsetY = complete_img.height / 2;

        complete_img.x = (this.photoFrame.width) / 2;
        complete_img.y = (this.photoFrame.height) / 2;
        this.photoFrame.addChild(complete_img);

        },this);
        preview_img.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            preview_img.scaleX = 1;
            preview_img.scaleY = 1;
            circle.scaleX = 1;
            circle.scaleY = 1;

            this.photoFrame.removeChild(complete_img);
        },this);

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
}