class RightPanel extends egret.DisplayObjectContainer{
    public bet_on_btn:BetOnBtn;
    public start_btn:BetBtn;
    public credit:Credit;
    public betPanel1:BetPanel;
    public betPanel2:BetPanel;
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
        right_panel_bg.graphics.beginFill(0xf0f0f0);
        right_panel_bg.graphics.lineStyle(2,0x121212);
        right_panel_bg.graphics.drawRoundRect(0,0,this.width,this.height,5);
        right_panel_bg.graphics.endFill();
        this.addChild(right_panel_bg);

        this.credit = new Credit();
        this.addChild(this.credit);

        this.betPanel1 = new BetPanel(0);
        this.addChild(this.betPanel1);

        this.betPanel2 = new BetPanel(1);
        this.addChild(this.betPanel2);

        this.bet_on_btn = new BetOnBtn("押注");
        this.addChild(this.bet_on_btn);
        this.bet_on_btn.x = 15;
        this.bet_on_btn.y = this.betPanel2.y+this.betPanel2.height+2;
        this.bet_on_btn.touchEnabled = true;
        //押注按钮的监听事件
        this.bet_on_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginBetOn,this);
        this.start_btn = new BetBtn("START");
        this.addChild(this.start_btn);
        this.start_btn.anchorOffsetX = this.start_btn.width/2;
        this.start_btn.x = this.width/2;
        this.start_btn.y = this.betPanel2.y+this.betPanel2.height+5;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginStart,this);

        
        let left_btn = new BetBtn("LEFT");
        this.addChild(left_btn);
        left_btn.anchorOffsetX = left_btn.width;
        left_btn.x = this.width/2-5;
        left_btn.y = this.start_btn.y+this.start_btn.height+5;

        let right_btn = new BetBtn("RIGHT");
        this.addChild(right_btn);
        right_btn.x = this.width/2+5;
        right_btn.y = this.start_btn.y+this.start_btn.height+5;

    }
    //处理押注按钮：1：可点击图片效果 2：图片可点击 3：清空之前押注的筹码 4：还原筹码区的筹码数
    private beginBetOn(){
        //开始押注
        this.start_btn.enableBtn();
        //清空之前押注的内容
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach((item:BetItem,index)=>{
            //图片可点击效果，放大图片
            // item.bet_item_icon.scaleX = 1.1;
            // item.bet_item_icon.scaleY = 1.1;
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


    private randomNormalDistribution(){
        var u=0.0, v=0.0, w=0.0, c=0.0;
        do{
            //获得两个（-1,1）的独立随机变量
            u=Math.random()*2-1.0;
            v=Math.random()*2-1.0;
            w=u*u+v*v;
        }while(w==0.0||w>=1.0)
        //这里就是 Box-Muller转换
        c=Math.sqrt((-2*Math.log(w))/w);
        //返回2个标准正态分布的随机数，封装进一个数组返回
        //当然，因为这个函数运行较快，也可以扔掉一个
        //return [u*c,v*c];
        console.log(v*c)
        return v*c;
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
                    let bonus_win = item.turn_number * item.bet_num;
                    //更新奖金池中的信息
                    this.credit.bonusWinItem.credit_num = this.credit.bonusWinItem.credit_num + bonus_win;
                    this.credit.bonusWinItem.credit_num_text.text = this.credit.bonusWinItem.credit_num + "";
                }
    
            });
        }

    }
    //BetPanel对开始按钮的响应处理，将图片复原，并不可点击
    public handleEndStart(){
        this.betPanel1.betItems.concat(this.betPanel2.betItems).forEach((item:BetItem,index)=>{
            item.bet_item_icon.touchEnabled = false;
        });
    }
}