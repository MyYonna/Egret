const APP_BG_COLOR: number = 0x87A09D;//小程序的背景颜色
const PF_BG_COLOR:number = 0xC7C7C7;//相框背景颜色
const PF_BR_COLOR:number = 0x0C0C0C;//相框边框
const PF_BR_WIDTH:number = 10;

const APP_NEXT_STATION:string = "next_station";
const APP_WAIT_STASTIC:string = "wait_stastic";
const CURRENT_STATION_CHARACTER_PRE:string = "character_";
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();
        egret.lifecycle.addLifecycleListener((context) => {
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
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
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
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
            await RES.loadGroup("icons", 0, loadingView);
            await RES.loadGroup("characters", 0, loadingView);
            await this.loadTheme();
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    //加载主题
    private loadTheme() {
        return new Promise((resolve, reject) => {
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
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
        var photo:egret.Sprite = new Photo(photoFrame,CURRENT_STATION_CHARACTER_PRE+this.current_station_character_index);//CURRENT_STATION_CHARACTER_PRE+CURRENT_STATION_INDEX
        // photo.addEventListener(CompleteEvent.Result,this.CompleteStation,this);//弹窗版本
        
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
            if(evt.localX==this.startX||(moveXZ&&this.current_station_character_index == 7) || (!moveXZ&&this.current_station_character_index == 1)){
                // this.once(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
                // this.once(egret.TouchEvent.TOUCH_END,this.end,this);
                return;
            }
            
            if(moveXZ){
                this.nextListener()
            }else{
                this.preListener();   
            }
    }
    //拼图完成后，接收事件，并进行处理
    private CompleteStation(evt:CompleteEvent){
        // var stageWidth = this.stage.stageWidth;
        // var stageHeight = this.stage.stageHeight;
        // //创建一个弹窗的蒙版
        // var mask:egret.Sprite = new egret.Sprite();
        // mask.graphics.beginFill(APP_BG_COLOR,0.6);//设置APP背景
        // mask.graphics.drawRect(0,0,stageWidth,stageHeight);
        // mask.graphics.endFill();
        // this.addChild(mask);
        //在此遮罩上创建下一关按钮
        this.createNextIcon();
        // var wait_panel:eui.Panel = this.createWaitPanel();
        // this.addContentAreaToPanel(wait_panel);
        // wait_panel.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //     this.removeChild(mask);
        // },this);
       

    }
    //创建一个panel
    private createWaitPanel():eui.Panel{
        var wait_panel = new eui.Panel();
        wait_panel.title = "破关";
        wait_panel.horizontalCenter = 0;
        wait_panel.verticalCenter = 0;
        wait_panel.elementsContent = [];
        
        this.addChild(wait_panel);
        return wait_panel;
    }
    //为panel添加内容区域和其他东西
    private addContentAreaToPanel(panel:eui.Panel){
        var contentArea:eui.Group = new eui.Group();
        var wait_stastic:egret.Bitmap = new egret.Bitmap(RES.getRes(APP_WAIT_STASTIC));
        var ratio = (panel.width)/wait_stastic.width;
        wait_stastic.scaleX = ratio;
        wait_stastic.scaleY = ratio;
        wait_stastic.x = 0;
        wait_stastic.y = 0;
        contentArea.addChild(wait_stastic);

        var next_button:eui.Button = new eui.Button();
        next_button.label = "下一关";
        next_button.width = 100;
        next_button.x = panel.width-next_button.width;
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
        contentArea.width = panel.width;
        contentArea.height = next_button.height+wait_stastic.height * ratio+panel.moveArea.height;
        contentArea.x = 0;
        contentArea.y = panel.moveArea.height;
        panel.elementsContent = [contentArea];
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
    //创建下一个按钮
    private createNextIcon(){
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
        this.addChild(next_station);
    }
        //创建上一个按钮
    private createPreIcon(){
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        //添加一个下一关的按钮，并注册监听
        var pre_station:egret.Bitmap = this.createBitmapByName(APP_NEXT_STATION);
        pre_station.scaleX = 0.1;
        pre_station.scaleY = 0.1;
        pre_station.x = pre_station.width*pre_station.scaleX+50;
        pre_station.y = stageHeight - (pre_station.height*pre_station.scaleY+50);
        pre_station.skewY = 180;
        pre_station.touchEnabled = true;
        pre_station.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            pre_station.scaleX = 0.15;
            pre_station.scaleY = 0.15;
            pre_station.x = pre_station.width*pre_station.scaleX+50;
            pre_station.y = stageHeight - (pre_station.height*pre_station.scaleY+50);
            this.preListener();
        },this)
        pre_station.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            pre_station.scaleX = 0.1;
            pre_station.scaleY = 0.1;
            pre_station.x = pre_station.width*pre_station.scaleX+50;
            pre_station.y = stageHeight - (pre_station.height*pre_station.scaleY+50);
        },this)
        this.addChild(pre_station);
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