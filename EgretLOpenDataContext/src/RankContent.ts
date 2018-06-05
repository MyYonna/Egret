class RankContent extends egret.ScrollView{
    public constructor(){
        super();
    }

    public render(){
        //设置滚动视图的内容区域以及其定位和高宽
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height-60;
        this.y = this.parent.getChildAt(1).height;
    }

    public listContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();;
}