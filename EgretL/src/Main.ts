const APP_BG_COLOR: number = 0x87A09D;//小程序的背景颜色
const PF_BG_COLOR:number = 0xC7C7C7;//相框背景颜色
const PF_BR_COLOR:number = 0x0C0C0C;//相框边框
const PF_BR_WIDTH:number = 10;

const APP_NEXT_STATION:string = "next_station";
const APP_WAIT_STASTIC:string = "wait_stastic";
const APP_BEGIN_SCENE:string = "begin_scene";
const APP_BEGIN_GAME:string = "begin_game_png";
const CURRENT_STATION_CHARACTER_PRE:string = "character_";
class Main extends egret.DisplayObjectContainer {


    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
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

    private async runGame() {
        await this.loadResource();
        await this.createBeginScene();
        // this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

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
    private  createBeginScene(){
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var begin_scene = new egret.Bitmap(RES.getRes(APP_BEGIN_SCENE));
        // var begin_game = new egret.Bitmap(RES.getRes(APP_BEGIN_GAME));
        var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
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
        },this)

    }
    /**
     * 创建游戏场景
     */
    private current_station_character_index:number = 1;
    private startX:number;
    private createGameScene() {
        //背景
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        var bg:egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(APP_BG_COLOR,1);//设置APP背景
       
        bg.graphics.drawRect(0,0,stageWidth,stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var that = this;
        var photoFrame:egret.Sprite = new PhotoFrame(bg);
        var photo:egret.Sprite = new Photo(photoFrame,CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index);

        photo.addEventListener(CompleteEvent.Result,function(){
            that.touchEnabled = true;
            that.addEventListener(egret.TouchEvent.TOUCH_BEGIN,that.begin,that);
            that.addEventListener(egret.TouchEvent.TOUCH_END,that.end,that);
        },this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,that.begin,that);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,that.end,that);

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