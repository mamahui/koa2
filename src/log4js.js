const log4js = require('log4js');
log4js.configure({
  appenders: {
    error: {
      type: 'file',           //日志类型
      category: 'errLogger',    //日志名称
      filename: __dirname + '/../logs/error.log/', //日志输出位置，当目录文件或文件夹不存在时自动创建
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100  //当文件内容超过文件存储空间时，备份文件的数量
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: __dirname + '/../logs/responses/',
      pattern: 'yyyy-MM-dd.log', //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    error: {appenders: ['error'], level: 'error'},
    response: {appenders: ['response'], level: 'info'},
    default: { appenders: ['response'], level: 'info'}
  },
  replaceConsole: true
});
const {formatError, formatRes} = require('./formatLog');
let logger = {};
let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');
// 封装错误日志
logger.errLogger = async (ctx, error, resTime) => {
  if(ctx && error) {
    await errorLogger.error(formatError(ctx, error, resTime))
  }
};
// 封装响应日志
logger.resLogger = async (ctx, resTime) => {
  if(ctx) {
    await resLogger.info(formatRes(ctx, resTime))
  }
};
module.exports = {logger};