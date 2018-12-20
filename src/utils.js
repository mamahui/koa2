class getReqInfo {
  constructor(req) {
    this.req = req;
    this.getIp = this.getIp.bind(this);
    this.getUserAgent = this.getUserAgent.bind(this);
  }

  // 获取客户端IP
  getIp () {
    return this.req.headers['x-forwarded-for'] ||
      this.req.connection.remoteAddress ||
      this.req.socket.remoteAddress ||
      this.req.connection.socket.remoteAddress;
  }

  // 获取客户端类型
  getUserAgent () {
  const UA = this.req.header['user-agent'];
  let type = '';
    if(UA.includes("iPhone")||UA.includes("iPod")||UA.includes("iPad")){
      type = "ios";
    } else if(UA.includes("Android") || UA.includes("Linux")) {
      type = "apk";
    } else if(UA.indexOf("micromessenger") > 0){
      type = "wx";
    }else {
      type = "pc";
    }
    return type;
  }
}
class getDate {
  constructor(params){
    this.dateString = params || new Date();
    this.getFullDate = this.getFullDate.bind(this);
    this.getYear = this.getYear.bind(this);
    this.getMonth = this.getMonth.bind(this);
    this.getYearMonth = this.getYearMonth.bind(this);
  }
  getFullDate () {return `${this.dateString.getFullYear()}-${this.dateString.getMonth() + 1}-${this.dateString.getDay()}`;}
  getYear () { return this.dateString.getFullYear();}
  getMonth () { return  this.dateString.getMonth()+1;}
  getYearMonth () { return `${this.dateString.getFullYear()}-${this.dateString.getMonth() + 1}`;}
}

module.exports = {
  getReqInfo,
  getDate
};