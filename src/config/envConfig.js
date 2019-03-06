console.log('-----------------', process.env.NODE_ENV);
const env = process.env.NODE_ENV.replace(/\s+/,"");
const port = env === 'development' ? 3000 : 3389;
const domain = env === 'development' ? `http://127.0.0.1:${port}`:`http://www.fairyx.cn:${port}`;
const fileLoadUrl = 'https://fisadmin.56qq.cn/insurance/upload-image.do';
module.exports = {port, domain, env, fileLoadUrl};