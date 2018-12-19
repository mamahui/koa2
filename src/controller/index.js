const superagent = require('superagent');
const fs = require('fs');
const path = require("path");
const response = require('./../config/responseConfig');
const cityConfig = require('./../config/zhilianCityConfig');

// 爬智联招聘网站
const callback_laGou = async (ctx, next) => {
  return new Promise(async (resolve, reject) => {
    const { name, cityId, pn } = await ctx.request.body;
   superagent.get(`https://fe-api.zhaopin.com/c/i/sou?pageSize=60&cityId=${cityId}&start=${pn*60}&workExperience=-1&education=-1&companyType=-1&employmentType=-1&jobWelfareTag=-1&kw=%E7%89%A9%E8%81%94%E7%BD%91&kt=3&_v=0.90822763&x-zp-page-request-id=87b8e12d005e499ea771477f072a93e9-1544333120222-620615`)  //学校里的一个论坛，这是登录提交地址
      .set('Cookie', 'urlfrom=121113803; urlfrom2=121113803; adfbid=0; adfbid2=0; ZP_OLD_FLAG=false; dywea=95841923.1898918011202134000.1544333016.1544333016.1544333016.1; dywec=95841923; Hm_lvt_38ba284938d5eddca645bb5e02a02006=1544333016; sts_deviceid=167916bbd1716c-0770cbc2d84be6-551f3c12-1327104-167916bbd185fb; sts_sg=1; sts_sid=167916bbd1a62-0254b162fd6b8a-551f3c12-1327104-167916bbd1ba65; sts_chnlsid=121113803; zp_src_url=https%3A%2F%2Fsp0.baidu.com%2F9q9JcDHa2gU2pMbgoY3K%2Fadrc.php%3Ft%3D06KL00c00fZmx9C0pRFx0KqiAsjEG6kT0000021OOdb00000JqOrvW.THLyktAJ0A3qmh7GuZR0T1dbnWc3myfvm10snAFbmW6Y0ZRqnHDvfRNKnWc4PYR3rHTzfHbkn1IjrRNAPjT4n1N7wRf0mHdL5iuVmv-b5HnkP101Pj63njchTZFEuA-b5HDv0ARqpZwYTZnlQzqLILT8Xh99ULKGUB4WUvYOTv-b5HDznHDkn16snzudIAdxTvqdThP-5yF9pywdTAPsXBudIAdxUyNbpgNV5yPsI0KWThnqnW0zrHb%26tpl%3Dtpl_11535_18778_14772%26l%3D1509949356%26attach%3Dlocation%253D%2526linkName%253D%2525E6%2525A0%252587%2525E5%252587%252586%2525E5%2525A4%2525B4%2525E9%252583%2525A8-%2525E6%2525A0%252587%2525E9%2525A2%252598-%2525E4%2525B8%2525BB%2525E6%2525A0%252587%2525E9%2525A2%252598%2526linkText%253D%2525E3%252580%252590%2525E6%252599%2525BA%2525E8%252581%252594%2525E6%25258B%25259B%2525E8%252581%252598%2525E3%252580%252591%2525E5%2525AE%252598%2525E6%252596%2525B9%2525E7%2525BD%252591%2525E7%2525AB%252599%252520%2525E2%252580%252593%252520%2525E5%2525A5%2525BD%2525E5%2525B7%2525A5%2525E4%2525BD%25259C%2525EF%2525BC%25258C%2525E4%2525B8%25258A%2525E6%252599%2525BA%2525E8%252581%252594%2525E6%25258B%25259B%2525E8%252581%252598%2525EF%2525BC%252581%2526xp%253Did(%252522m3170348802_canvas%252522)%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FH2%25255B1%25255D%25252FA%25255B1%25255D%2526linkType%253D%2526checksum%253D40%26ie%3DUTF-8%26f%3D8%26tn%3Dbaidu%26wd%3D%25E6%2599%25BA%25E8%2581%2594%26oq%3D%25E6%2599%25BA%25E8%2581%2594%26rqlang%3Dcn; __utmc=269921210; __utmt=1; __xsptplusUT_30=1; _jzqa=1.2280856215568354000.1544333017.1544333017.1544333017.1; _jzqc=1; _jzqy=1.1544333017.1544333017.1.jzqsr=baidu|jzqct=%E6%99%BA%E8%81%94.-; _jzqckmp=1; sajssdk_2015_cross_new_user=1; firstchannelurl=https%3A//passport.zhaopin.com/login; lastchannelurl=https%3A//ts.zhaopin.com/jump/index_new.html%3Futm_source%3Dbaidupcpz%26utm_medium%3Dcpt%26utm_provider%3Dpartner%26sid%3D121113803%26site%3Dnull; dywez=95841923.1544333050.1.2.dywecsr=baidupcpz|dyweccn=(not%20set)|dywecmd=cpt; __utma=269921210.2018042823.1544333016.1544333016.1544333050.2; __utmz=269921210.1544333050.2.2.utmcsr=baidupcpz|utmccn=(not%20set)|utmcmd=cpt; __xsptplus30=30.1.1544333016.1544333050.2%232%7Csp0.baidu.com%7C%7C%7C%25E6%2599%25BA%25E8%2581%2594%7C%23%23dn1xDygbzdd-ANDZ4Al13EHW1ZujOsg9%23; _jzqb=1.4.10.1544333017.1; index-c=2; jobRiskWarning=true; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22697463688%22%2C%22%24device_id%22%3A%22167916bc74e7f-0022cd87e4d27c-551f3c12-1327104-167916bc74f59e%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E4%BB%98%E8%B4%B9%E5%B9%BF%E5%91%8A%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fsp0.baidu.com%2F9q9JcDHa2gU2pMbgoY3K%2Fadrc.php%3Ft%3D06KL00c00fZmx9C0pRFx0KqiAsjEG6kT0000021OOdb00000JqOrvW.THLyktAJ0A3qmh7GuZR0T1dbnWc3myfvm10snAFbmW6Y0ZRqnHDvfRNKnWc4PYR3rHTzfHbkn1IjrRNAPjT4n1N7wRf%22%2C%22%24latest_referrer_host%22%3A%22sp0.baidu.com%22%2C%22%24latest_search_keyword%22%3A%22%E6%99%BA%E8%81%94%22%2C%22%24latest_utm_source%22%3A%22baidupcpz%22%2C%22%24latest_utm_medium%22%3A%22cpt%22%7D%2C%22first_id%22%3A%22167916bc74e7f-0022cd87e4d27c-551f3c12-1327104-167916bc74f59e%22%7D; LastCity=%E6%88%90%E9%83%BD; LastCity%5Fid=801; dyweb=95841923.10.6.1544333078533; __utmb=269921210.8.6.1544333078539; GUID=7131ec563ee04e45a55a0e8714f1b74b; Hm_lpvt_38ba284938d5eddca645bb5e02a02006=1544333121; ZL_REPORT_GLOBAL={%22sou%22:{%22actionid%22:%22dc90a3d5-016b-4fd0-aeff-2ea4aded60cb-sou%22%2C%22funczone%22:%22smart_matching%22}}; sts_evtseq=14')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36')
      .end( async function (err, res){
        if (err) throw err;
        const file = {
          pn,
          total: JSON.parse(res.text).data.numFound,
          text: JSON.parse(res.text).data.results,
        };
        await fs.readFile(path.join(__dirname, `./../../public/file/智联招聘-${name}.json`),'utf-8',async function (err, data) {
          if(err) {
            await fs.writeFile(path.join(__dirname, `./../../public/file/智联招聘-${name}.json`), JSON.stringify(file), function(err1) {
              if(err1) {
                throw err1;
              }
            });
          } else {
            let resObj = JSON.parse(data);
            if(pn > resObj.pn) {
              resObj.pn = pn;
              resObj.total = JSON.parse(res.text).data.numFound;
              resObj.text = [...resObj.text, ...JSON.parse(res.text).data.results];
              await fs.writeFile(path.join(__dirname, `./../../public/file/智联招聘-${name}.json`), JSON.stringify(resObj), function(err1) {
                if(err1) {
                  throw err1;
                }
              });
            }
          }
        });
         // await fs.writeFile(path.join(__dirname, `./../../public/file/智联招聘-${name}.json`), file, function(err) {
         //   if(err) {
         //     throw err;
         //   }
         // });
        resolve(res);
      });
  })
};
const getzhilianData = async (ctx, next) => {
  try {
    let data= await callback_laGou(ctx, next);
    return response.success(JSON.parse(data.text) || '暂无');
  } catch (err) {
    return response.success(err);
  }
};

//
const getzhilianCityConfig = async (ctx, next) => {
return response.success(cityConfig.cityConfig)
};
module.exports = {
  callback_laGou,
  getzhilianData,
  getzhilianCityConfig
};