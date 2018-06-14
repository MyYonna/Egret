class RankContent extends egret.ScrollView{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
    }

    public render(){
        //设置滚动视图的内容区域以及其定位和高宽
        this.listContainer = new egret.DisplayObjectContainer();
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height-30;
        this.y = this.parent.getChildAt(1).height;
    }

    public listContainer:egret.DisplayObjectContainer ;
}