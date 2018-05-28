class CompleteEvent extends egret.Event
{
    public static Result:string = "恭喜，过关成功。。";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}