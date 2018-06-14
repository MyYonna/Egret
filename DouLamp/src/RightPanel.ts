class RightPanel extends egret.DisplayObjectContainer{
    private bet_on_btn:BetOnBtn;
    private rankBtn:RankBtn;
    private start_btn:BetBtn;
    private left_btn:BetBtn;
    private right_btn:BetBtn;
    public credit:Credit;
    public betPanel1:BetPanel;
    public betPanel2:BetPanel;
    private isdisplay:boolean;
    private openDataContext = wx.getOpenDataContext();
    private openid:string;
    private rankUi:RankUI;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    public render(){
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth - this.parent.getChildAt(2).x - this.parent.getChildAt(2).width-10;
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height/2;
        this.y = this.stage.stageHeight/2;
        this.x = this.stage.stageWidth;

        let right_panel_bg = new egret.Shape();
        right_panel_bg.graphics.beginFill(0xf0f0f0,0.0);
        // right_panel_bg.graphics.lineStyle(2,0x121212);
        right_panel_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);

        this.credit = new Credit();
        this.addChild(this.credit);

        this.betPanel1 = new BetPanel(0);
        this.addChild(this.betPanel1);

        this.betPanel2 = new BetPanel(1);
        this.addChild(this.betPanel2);

        this.bet_on_btn = new BetOnBtn("BET");
        this.addChild(this.bet_on_btn);
        this.bet_on_btn.x = 15;
        this.bet_on_btn.y = this.betPanel2.y+this.betPanel2.height+2;
        //押注按钮的监听事件
        this.bet_on_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginBetOn,this);

        this.rankBtn = new RankBtn("Game_Rank_png");
        this.addChild(this.rankBtn);
        
        //排行按钮的监听事件
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createScoreRank,this);

        this.start_btn = new BetBtn("START");
        this.addChild(this.start_btn);
        this.start_btn.anchorOffsetX = this.start_btn.width/2;
        this.start_btn.x = this.width/2;
        this.start_btn.y = this.betPanel2.y+this.betPanel2.height+5;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginStart,this);

        
        this.left_btn = new BetBtn("LEFT");
        this.addChild(this.left_btn);
        this.left_btn.anchorOffsetX = this.left_btn.width;
        this.left_btn.x = this.width/2-5;
        this.left_btn.y = this.start_btn.y+this.start_btn.height+5;
        this.left_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ifLittle,this);

        this.right_btn = new BetBtn("RIGHT");
        this.addChild(this.right_btn);
        this.right_btn.x = this.width/2+5;
        this.right_btn.y = this.start_btn.y+this.start_btn.height+5;
        this.right_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ifGreat,this);

    }
    //处理押注按钮：1：可点击图片效果 2：图片可点击 3：清空之前押注的筹码 4：还原筹码区的筹码数
    private beginBetOn(){
        //开始押注1:开始按钮可用 2：左右按钮不可用 3：游戏盘复原 4：停止闪烁
        this.start_btn.enableBtn();
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        let parent = <Main> this.parent;
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        //清空之前押注的内容
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach((item:BetItem,index)=>{
            //图片可点击效果，放大图片
            //置为可点击
            item.bet_item_icon.touchEnabled = true;
            //清空筹码
            item.bet_num = 0;
            item.bet_text_num.text = item.bet_num+"";
            //清空滤镜
            item.filters = [];
        });
        //还原筹码区的筹码
        this.credit.creditItem.credit_num = this.credit.creditItem.credit_num+bet_buffer;
        this.credit.creditItem.credit_num_text.text = this.credit.creditItem.credit_num+"";
        //置空bet缓存
        bet_buffer = 0;
        //置空奖金
        this.bonus_win = 0;

    }
    private i=0;
    private j=0;
    //开始跑马灯
    private beginStart(){
        //跑马灯过程中，将开始和押注按钮置为不可用,
        this.start_btn.disableBtn();
        this.bet_on_btn.disableBtn();
        //并复原图片按钮的大小，也置为不可用
        this.handleEndStart();
        //置空bet缓存
        bet_buffer = 0;
        let sure_value = Math.round(Math.random()*650);
        let fruit_res = this.weatherFruit(sure_value);
        //开始应用跑马灯
        let count = 100+Math.random()*100;
        this.marquee(fruit_res,count);

    }
    //判断是否小
    private ifLittle(){
        let parent = <Main> this.parent;
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        let num:number = parent.gameDisc.gameDiscCenter.text_num;
        if(num<=4){
            //判定成功，分数翻倍
            //更新奖金池中的信息
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }else{
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num - this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        //更新排行榜
        this.sendScoreToOpenContext();
    }
    //判断是否大
    private ifGreat(){
        let parent = <Main> this.parent;
        this.left_btn.disableBtn();
        this.right_btn.disableBtn();
        parent.gameDisc.gameDiscCenter.stopProduceRanom();
        parent.gameDisc.gameDiscCenter.stopTwinkleLamp();
        parent.gameDisc.gameDiscCenter.render();
        let num:number = parent.gameDisc.gameDiscCenter.text_num;
        if(num>4){
            //判定成功，分数翻倍
            //更新奖金池中的信息
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }else{
            this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num - this.bonus_win;
            this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
        }
        //更新排行榜
        this.sendScoreToOpenContext();
    }
    //跑马灯
    private marquee(fruit_res,count){
        this.j++;
        let that = this;
        this.i = this.i % 24;
        let parent = <Main> this.parent;
        let fruitDiscIcon = parent.gameDisc.fruitDiscIcons[Fruit_Excute_Order[this.i]];
        fruitDiscIcon.giveVFX();
        if(this.j>count){
            if(fruitDiscIcon.icon_res == fruit_res){
                this.i = 0;
                this.j = 0;
                this.handleSelectIcon(fruit_res);
                parent.history.addItem(new FruitHistoryItem(fruit_res));
                this.bet_on_btn.enableBtn();//激活押注按钮
                return;
            }
        }
        //延迟调用
        setTimeout(function() {
            fruitDiscIcon.clearVFX();
            that.i ++;
            that.marquee(fruit_res,count);
        }, 20);
    }


    //633判断为哪种水果
    private weatherFruit(value:number):string{
        let fruit;
        if(value>(900-6)){
            fruit = Fruit_Icons[Fruit_ICON.Chip_100];
        }else if(value>(900-6-12)){
            fruit = Fruit_Icons[Fruit_ICON.Chip_50];
        }else if(value>(900-6-12-15)){
            fruit = Fruit_Icons[Fruit_ICON.Seven];
        }else if(value>(900-6-12-15-20)){
            fruit = Fruit_Icons[Fruit_ICON.Cocco];
        }else if(value>(900-6-12-15-20-30)){
            fruit = Fruit_Icons[Fruit_ICON.Watermelon];
        }else if(value>(900-6-12-15-20-30-120)){
            fruit = Fruit_Icons[Fruit_ICON.Apple];
        }else if(value>(900-6-12-15-20-30-120-300)){
            fruit = Fruit_Icons[Fruit_ICON.Strawberry];
        }else if(value>(900-6-12-15-20-30-120-300-60)){
            fruit = Fruit_Icons[Fruit_ICON.Arancia];
        }else if(value>(900-6-12-15-20-30-120-300-60-40)){
            fruit = Fruit_Icons[Fruit_ICON.Lime];
        }else if(value>(900-6-12-15-20-30-120-300-60-40-30)){
            fruit = Fruit_Icons[Fruit_ICON.Banana];
        }else{
             fruit = Fruit_Icons[Fruit_ICON.Dice];
        }
        return fruit;
    }
    //处理跑马灯结束后对筹码以及奖金池的处理
    private bonus_win:number = 0;
    public handleSelectIcon(fruit_res:string){
        //对押注进行计算
        if(fruit_res == "Dice_png"){
            this.start_btn.enableBtn();
        }else{
            this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach((item:BetItem,index)=>{
                if(item.icon == fruit_res){
                    item.giveVFX();
                }
                if(item.icon == fruit_res && item.bet_num != 0){
                    //说明押注成功。给予奖金,如果押注数是零，则不给于
                    this.bonus_win = item.turn_number * item.bet_num;
                    //更新奖金池中的信息
                    this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + this.bonus_win;
                    this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
                    let parent = <Main> this.parent;
                    //押注成功则进行翻倍判断1：红灯闪烁 2：产生随机数 3：左右按钮可用
                    parent.gameDisc.gameDiscCenter.produceRandomNum();
                    parent.gameDisc.gameDiscCenter.twinkleLamp();
                    this.left_btn.enableBtn();
                    this.right_btn.enableBtn();
                }
    
            });
        //更新排行榜
        this.sendScoreToOpenContext();
        }
    }
    //BetPanel对开始按钮的响应处理，将图片复原，并不可点击
    public handleEndStart(){
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach((item:BetItem,index)=>{
            item.bet_item_icon.touchEnabled = false;
        });
    }
    //发送更新排行榜的信息
    private sendScoreToOpenContext(){
        wx.checkSession({
            success:res=>{
                console.log(res,"success");
                this.openDataContext.postMessage({
                    update_score: true,
                    openid:this.openid ,
                    score:this.credit.bonusWinItem.credit_num +this.credit.creditItem.credit_num
                });
            },
            fail:res=>{
                console.log(res,"fail");
                this.login();
                this.openDataContext.postMessage({
                    update_score: true,
                    openid:this.openid ,
                    score:this.credit.bonusWinItem.credit_num +this.credit.creditItem.credit_num
                });
            },
            complete:res=>{
                console.log(res);
            }
        })
    }
    //创建排名
    private createScoreRank(){
        if (this.isdisplay) {
                this.removeChildAt(this.numChildren-1);
                this.isdisplay = false;
            } else {
                wx.checkSession({
                    success:res=>{
                        console.log(res,"success");
                        //开放数据
                        this.rankUi = new RankUI();
                        this.addChild(this.rankUi);
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
                        
                    },
                    fail:res=>{
                        console.log(res,"fail");
                        this.login();
                        this.rankUi = new RankUI();
                        this.addChild(this.rankUi);
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
                    },
                    complete:res=>{
                        console.log(res);
                    }
                })
            }

    }
    //如果失效，则登录
    private async login(){
        const loginInfo =  await platform.login();
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
}
