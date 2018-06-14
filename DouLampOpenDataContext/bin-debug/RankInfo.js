var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RankInfo = (function () {
    function RankInfo(nickname, avatarUrl, openid, score) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.score = score;
    }
    return RankInfo;
}());
__reflect(RankInfo.prototype, "RankInfo");
