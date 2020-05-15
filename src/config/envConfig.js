const env = process.env.NODE_ENV.replace(/\s+/,"");
const port = env === 'development' ? 3000 : 8080;
const domain = env === 'development' ? `http://127.0.0.1:${port}`:`http://www.fairyx.cn:${port}`;

module.exports = {
  port,
  domain,
  env
};
