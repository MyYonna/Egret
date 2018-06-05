class Main extends egret.DisplayObjectContainer {

    constructor() {
        super();
        wx.onMessage(data => {
            var that = this;
            if (data.isDisplay) {
                wx.getFriendCloudStorage({
                    keyList: ["rank_score"],
                    success: res => {
                        // this.gameData = [];//需要清空数据才行，暂时不做
                        res.data.forEach((friendInfo, index) => {
                            var value = JSON.parse(friendInfo.KVDataList[0].value);
                            this.gameData.push(new RankInfo(friendInfo.nickname,friendInfo.avatarUrl,friendInfo.openid,value.wxgame.score,value.cost_step));
                        });
                        this.runGame();
                    },
                    fail: err => {
                        console.log(err);
                    },
                    complete: () => {

                    }
                });
                //监听消息 isDisplay
            } else {
                this.cancelGame();
            }
            if (data.update_max_station) {//更新排行榜数据
                var score = {
                    "wxgame": {
                        "score": data.max_station,
                        "update_time": new Date().toString
                    },
                    "cost_step": data.steps
                };
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "rank_score", value: JSON.stringify(score) }], success: res => {
                        console.log(res);
                    }, fail: err => {
                    }, complete: () => {

                    }
                });
            }
        });
    }

    private readonly scrollView = new egret.ScrollView();
    private gameData:RankInfo[] = [];//排行榜数据

    private runGame() {
        let title = new egret.TextField();
        title.text = "好友排行榜";
        title.size = 40;
        title.width = this.stage.stageWidth;
        title.y = 50;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.textColor = 0xffffff;
        this.addChild(title)
        
        const listContainer = new egret.DisplayObjectContainer();
        //设置滚动视图的内容区域以及其定位和高宽
        this.scrollView.setContent(listContainer);
        this.scrollView.width = this.stage.stageWidth * 0.8;
        this.scrollView.height = this.stage.stageHeight * 0.6;
        this.scrollView.anchorOffsetX = this.scrollView.width / 2;
        this.scrollView.anchorOffsetY = this.scrollView.height / 2
        this.scrollView.x = this.stage.stageWidth >> 1;
        this.scrollView.y = (this.stage.stageHeight >> 1)-50;
        //为滚动视图添加背景色
        var background: egret.Shape = new egret.Shape();
        // background.graphics.lineStyle(1,0x797b7e);;
        background.graphics.beginFill(0x363636, 1);
        background.graphics.drawRect(0, 0, this.scrollView.width, this.scrollView.height);
        background.graphics.endFill();
        //定位滚动视图背景色的位置
        background.anchorOffsetX = background.width >> 1;
        background.anchorOffsetY = background.height >> 1;
        background.x = this.stage.stageWidth >> 1;
        background.y = (this.stage.stageHeight >> 1 )-50;
        this.addChild(background);
        this.addChild(this.scrollView);

        //绘制排行榜的头部
        let item = new RankHead();
        item.height = 60;
        item.width = this.scrollView.width;
        item.anchorOffsetX = item.width / 2;
        item.x = this.scrollView.x;;
        item.y = this.scrollView.y-this.scrollView.height/2 - item.height+5;
        item.render();

        this.addChild(item);
        //绘制主内容区
        this.gameData.forEach(
            (value, index) => {
                let item = new RankItem(index,value,false);
                item.y = index * 100;
                item.height = 100;
                item.width = this.scrollView.width;
                item.render();
                listContainer.addChild(item);
                if (index == 0) {
                    //展示自己的排名
                    let self_item1 = new RankItem(index,value,true);
                    self_item1.height = 100;
                    self_item1.width = this.scrollView.width;
                    self_item1.anchorOffsetX = self_item1.width/2;
                    self_item1.x = this.stage.stageWidth/2;
                    self_item1.y = this.scrollView.y + this.scrollView.height/2+20;
                    self_item1.render();
                    this.addChild(self_item1)
                }

            }, this);
    }

    private cancelGame(): void {
        for (let i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
        this.scrollView.removeContent();
    }
}