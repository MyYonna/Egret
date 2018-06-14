class Main extends egret.DisplayObjectContainer {
    private openid:string;
    private gameData: RankInfo[] = [];//排行榜数据
    constructor() {
        super();
        
        wx.onMessage(data => {
            var that = this;
            console.log(data)
            if (data.isDisplay) {
                this.openid = data.openid;
                     wx.getFriendCloudStorage({
                        keyList: ["dou_lamp_rank_socre"],
                        success: res => {
                            this.gameData = [];//需要清空数据才行，暂时不做
                            res.data.forEach((friendInfo, index) => {
                                if(Object.keys(friendInfo.KVDataList).length>0){
                                    friendInfo.KVDataList.forEach((item,index)=>{
                                    var value = JSON.parse(item.value);
                                    this.gameData.push(new RankInfo(friendInfo.nickname, friendInfo.avatarUrl, friendInfo.openid, value.score));
                                    })
                                }
                            });
                            this.runGame();
                        },
                        fail: err => {
                        },
                        complete: () => {
                        }
                    });
                //监听消息 isDisplay
            } else {
                this.cancelGame();
            }

           if (data.update_score) {//更新排行榜数据
                var station = {
                    "score": data.score
                };
                wx.getUserCloudStorage({keyList:["dou_lamp_rank_socre"],success:res=>{
                    wx.setUserCloudStorage({
                        KVDataList: [{ key: "dou_lamp_rank_socre", value: JSON.stringify(station) }], success: res => {
                            console.log(res)
                        }, fail: err => {
                            console.log(err)
                        }, complete: () => {
                        }
                    });
                },fail:res=>{},complete:res=>{}});


            }

            if(data.obtain_score){
                    wx.getUserCloudStorage({ keyList:["dou_lamp_rank_socre"],success:res=>{
                        let kvDataList = res.KVDataList;
                        console.log(kvDataList)
                        // if(Object.keys(kvDataList).length>0){
                        //     kvDataList.forEach((item,index)=>{
                        //         var value = JSON.parse(item.value);
                        //         wx.getOpenDataContext().postMessage({
                        //             is_self_score:true,
                        //             score:value.score
                        //         })
                        //     })
                        // }
                    },fail:res=>{},complete:res=>{}});
            }
        
        });
                //测试点击
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
            console.log('子域输出点击');
        }, this);
    }

    private runGame() {
        //绘制排行榜
        let rank = new Rank();
        this.addChild(rank);
        let listContainer = rank.rankContent.listContainer;
        //填充内容区域的条目
        if(this.gameData.length == 0 ){
            return
        }
        this.gameData.forEach(
            (value:RankInfo, index) => {
                let item = new RankItem(index, value, false);
                item.y = index * 30;
                item.height = 30;
                item.width = rank.width;
                listContainer.addChild(item);
                if (value.openid == this.openid) {
                    //展示自己的排名
                    let self_item1 = new RankItem(index, value, true);
                    self_item1.height = 30;
                    self_item1.width = rank.width;
                    self_item1.anchorOffsetX = self_item1.width / 2;
                    self_item1.x = this.stage.stageWidth / 2;
                    self_item1.y = rank.y + rank.height + 5;
                    this.addChild(self_item1)
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