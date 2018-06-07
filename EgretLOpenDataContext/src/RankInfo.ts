class RankInfo{
    public nickname:string;
    public avatarUrl:string;
    public score:number;
    public openid:string;

    public constructor(nickname,avatarUrl,openid,score){
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.score = score;
    }
}