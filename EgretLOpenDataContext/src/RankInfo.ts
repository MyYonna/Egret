class RankInfo{
    public nickname:string;
    public avatarUrl:string;
    public score:number;
    public openid:string;
    public steps:number;

    public constructor(nickname,avatarUrl,openid,score,steps){
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.score = score;
        this.steps = steps;
    }
}