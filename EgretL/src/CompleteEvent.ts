class CompleteEvent extends egret.Event
{
    public static Result:string = "COMPLETE";
    public steps:number;
    public constructor(type:string,steps:number, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
        this.steps = steps;
    }
}