class Main extends egret.DisplayObjectContainer {
    private openid:string;
    constructor() {
        super();
        wx.onMessage(data => {
            var that = this;
            if (data.isDisplay) {
                this.openid = data.openid;
                wx.getFriendCloudStorage({
                    keyList: ["rank_score"],
                    success: res => {
                        this.gameData = [];//需要清空数据才行，暂时不做
                        res.data.forEach((friendInfo, index) => {
                            var value = JSON.parse(friendInfo.KVDataList[0].value);
                            this.gameData.push(new RankInfo(friendInfo.nickname, friendInfo.avatarUrl, friendInfo.openid, value.wxgame.score, value.cost_step));
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

    private gameData: RankInfo[] = [];//排行榜数据

    private runGame() {
        //排行榜标题
        let title = new RankTitle();
        this.addChild(title)
        title.render();
        //绘制排行榜
        let rank = new Rank();
        this.addChild(rank);
        rank.render();

        //绘制排行榜的头部
        let item = new RankHead();
        rank.setHeader(item);
        item.render();
        //内容区域
        let rankContent = new RankContent();
        let listContainer = rankContent.listContainer;
        rank.setContent(rankContent);
        rankContent.render();
        //填充内容区域的条目
        this.gameData.forEach(
            (value:RankInfo, index) => {
                let item = new RankItem(index, value, false);
                item.y = index * 100;
                item.height = 100;
                item.width = rank.width;
                item.render();
                listContainer.addChild(item);
                if (value.openid == this.openid) {
                    //展示自己的排名
                    let self_item1 = new RankItem(index, value, true);
                    self_item1.height = 100;
                    self_item1.width = rank.width;
                    self_item1.anchorOffsetX = self_item1.width / 2;
                    self_item1.x = this.stage.stageWidth / 2;
                    self_item1.y = rank.y + rank.height / 2 + 20;
                    this.addChild(self_item1)
                    self_item1.render();
                }

            }, this);

    }
    //删除离屏的内容
    private cancelGame(): void {
        for (let i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
    }
}