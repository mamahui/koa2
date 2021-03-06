const router = require('koa-router')();
const path = require("path");
const fs = require('fs');
const routerConfig =  require( '../config/routerConfig');
const callback =  require( '../controller');
const utils = require('../utils');
const nodeExcel = require('excel-export');//关联excel-export模块



router.get('/',async(ctx,next)=>{ctx.redirect('/index')});
router.get(routerConfig.GET_ZHI_LIAN_CITY_CONFIG, async (ctx, next) => {
  ctx.body = await callback.getzhilianCityConfig(ctx, next);
});
router.get('/index', async (ctx, next) => {
  const reqInfo = new utils.getReqInfo(ctx.req);
  const reqInfo1 = new utils.getReqInfo(ctx.request);
  const start = new Date();
  const html = await new Promise((resolve, reject) => {
    fs.readFile('./public/index.html', (err, data) => {
      if(err) {
        reject();
      } else {
        resolve(data);
      }
    })
  });
  ctx.type = 'html';
  ctx.body = html;
  const ms = new Date() - start;
  console.log(ms)
});
router.get('/miss', async (ctx, next) => {
  const html = await new Promise((resolve, reject) => {
    fs.readFile('./public/miss.html', (err, data) => {
      if(err) {
        reject();
      } else {
        resolve(data);
      }
    })
  });
  ctx.type = 'html';
  ctx.body = html;
});
router.get('/gesture', async (ctx, next) => {
  const html = await new Promise((resolve, reject) => {
    fs.readFile('./public/gesture.html', (err, data) => {
      if(err) {
        reject();
      } else {
        resolve(data);
      }
    })
  });
  ctx.type = 'html';
  ctx.body = html;
});
router.get('/test', async (ctx, next) => {
  const html = await new Promise((resolve, reject) => {
    fs.readFile('./public/index.html', (err, data) => {
      if(err) {
        reject();
      } else {
        resolve(data);
      }
    })
  });
  ctx.type = 'html';
  ctx.body = html;
});


router.post(routerConfig.GRAB_ZHI_LIAN, async (ctx, next) => {
  ctx.body = await callback.getzhilianData(ctx, next)
});
router.post(routerConfig.UPLOAD_FILES, async (ctx, next) => {
  ctx.body = await callback.upLoad(ctx, next);
});
router.post(routerConfig.GET_DATA, async (ctx, next) => {
  ctx.body = await callback.getUserData(ctx, next);
});
//导出Excel，xlsx格式
router.get('/exportexcel/:name',async (ctx) => {
  const name = decodeURIComponent(ctx.url).split('/')[2];
  async function readydata() {
    return new Promise(async (resolve, reject) => {
      await fs.readFile(path.join(__dirname, `./public/file/智联招聘-${name}.json`),'utf-8',async function (err, data) {
        if (!err) {
          resolve(JSON.parse(data).text);
        } else {
          reject('暂时还没有获取过该区域的信息，请先获取')
        }
      });
    });
    // let exceldata=[
    //   {name:"张三",age:"20",sex:"男",birthday:"1998-10-10"},
    //   {name:"李四",age:"21",sex:"男",birthday:"1997-08-08"},
    //   {name:"王五",age:"22",sex:"男",birthday:"1996-06-06"},
    //   {name:"赵六",age:"20",sex:"男",birthday:"1998-12-12"},
    // ];
  }
  //导出
  async function exportdata(v) {
    let conf ={};
    conf.name = "sheet1";//表格名
    let alldata = [];
    for(let i = 0;i<v.length;i++){
      let arr = [];
      arr.push(v[i].company.name);
      arr.push(v[i].salary);
      arr.push(v[i].jobName);
      arr.push(v[i].city.display);
      arr.push(v[i].eduLevel.name);
      arr.push(v[i].jobType.display);
      arr.push(v[i].workingExp.name);
      arr.push(v[i].timeState);
      arr.push(v[i].updateDate);
      alldata.push(arr);
    }
    //决定列名和类型
    conf.cols = [{
      caption:'公司名称',
      type:'string',
      width: 500
    },{
      caption:'薪水',
      type:'string',
      width: 500
    },{
      caption:'岗位',
      type:'string',
      width: 500
    },{
      caption:'工作地点',
      type:'string',
      width: 500
    },{
      caption:'学历要求',
      type:'string',
      width: 500
    },{
      caption:'岗位类型',
      type:'string',
      width: 500
    },{
      caption:'年限要求',
      type:'string',
      width: 500
    },{
      caption:'招聘状态',
      type:'string',
      width: 500
    },{
      caption:'更新时间',
      type:'string',
      width: 500
    }];
    conf.rows = alldata;//填充数据
    let result = nodeExcel.execute(conf);
    //最后3行express框架是这样写
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    // res.end(result, 'binary');
    let data = new Buffer(result,'binary');
    ctx.set('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
    ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent("物联网岗位合集-"+name)+".xlsx");
    ctx.body=data;
  }
  try {
    let r=await readydata();
    await exportdata(r);
  } catch (e) {
    ctx.body = e
  }
});


module.exports = router;