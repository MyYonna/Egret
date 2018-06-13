class FruitHistoryContent extends egret.ScrollView{


   public listContainer:egret.DisplayObjectContainer;
   public constructor(){
       super();
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
   } 

   public render(){
        this.listContainer = new egret.DisplayObjectContainer();
        this.setContent(this.listContainer);
        this.width = this.parent.width;
        this.height = this.parent.height-this.parent.getChildAt(0).height;
        this.y = this.parent.getChildAt(0).height;
        this.listContainer.width = this.width;
   }

   public addItem(item:FruitHistoryItem){
       this.listContainer.addChild(item);
   }
}