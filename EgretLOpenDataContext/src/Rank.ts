class Rank extends egret.DisplayObjectContainer{
    private header:egret.DisplayObject;
    private content:egret.DisplayObject;
    public constructor(){
        super();
    }
    public setHeader(header:egret.DisplayObject){
        this.header = header;
    }

    public setContent(content:egret.DisplayObject){
        this.content = content;
    }
}