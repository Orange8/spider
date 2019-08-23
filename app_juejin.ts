import { remote_post, remote_get } from './api';
import { db } from './utils';

const go = async () => { 
  let params = {
    "operationName":"",
    "query":"",
    "variables":{
      "category":"5562b415e4b00c57d9b94ac8",
      "first":20,
      "after":"",
      "order":"POPULAR"
    },
    "extensions":{
      "query":{
        "id":"653b587c5c7c8a00ddf67fc66f989d42"
      }
    }
  }
  let headers = {
    'X-Agent': 'Juejin/Web'
  }
  const res: any = await remote_post('https://web-api.juejin.im/query', params, headers);
  // const res: any = await remote_get('https://juejin.im/welcome/frontend', {});
  // const res: any = await remote_get('https://juejin.im/timeline/frontend', {});
  console.log(res);
  let dataList: any = {};
  dataList = res.data.articleFeed.items.edges;
  // 往数据库里面写入数据
  dataList.map((item:any) => {
    db('insert into juejin(title,url) values(?,?)', [item.node.title, item.node.originalUrl], (err: any, data: any) => {
        if(data){
          console.log('提交数据成功！！')
        }
        if (err) {
          console.log(err);
            console.log('提交数据失败')
        }
    })
  })
} 
go();