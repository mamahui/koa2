const koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static');
const koaBody = require('koa-body');
const envConfig = require('./src/config/envConfig');
const app = new koa();
const router = require('./src/router/index');
const cors = require('koa2-cors');
const response = require('./src/config/responseConfig');

// app.use(staticServer(__dirname , './public'));
app.use(staticServer('./public'));
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000*1024*1024 // 设置上传文件大小最大限制，默认20M
  }
}));
app.use(bodyParser());
app.use(views(__dirname + './src/views', {
  map : {html:'ejs'}
}));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));
app.use(cors());
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
//   await next();
// });



app.use(router.routes());
app.on('error', async(err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(envConfig.port, () => {
  console.log(`server is listening at ${envConfig.port} port`);
});
