const request = require('request');
const fs = require('fs');
const Bagpipe = require('bagpipe');
import { remote_get } from './api';
import { db } from './utils';

const go = async () => {
  let params = {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  }
  // const res: any = await remote_get('https://huaban.com/explore/cat/', params);
  const res: any = await remote_get('https://huaban.com/explore/cat/?max=2515078132&limit=100&wfl=1', params);
  // console.log(res);
  let urls: any[] = [];
  urls = res.pins;
  // 打印数组
  // console.log(urls);
  // 往数据库里面写入数据
  const urlList = urls.map((item, index) => {
    // db('insert into huaban(url, title) values(?,?)', ['https://hbimg.huabanimg.com/' + urls[index].file.key, 'cat'], (err: any, data: any) => {
    //     if(data){
    //       console.log('提交数据成功！！')
    //     }
    //     if (err) {
    //       console.log(err);
    //         console.log('提交数据失败')
    //     }
    // });
    return 'https://hbimg.huabanimg.com/' + urls[index].file.key;
  })
  console.log(urlList);
  let num = 0;
  var download = function(uri:string, filename:string, callback:any){
    request.head(uri, function(err:any, res:any, body:any){
      let fileType = res.headers['content-type'].split('/')[1];
      num++;
      console.log(num);
      filename = filename + '.' + fileType
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  var bagpipe = new Bagpipe(10,{timeout: 500});
  for(var i = 0; i < urlList.length; i++) {
      bagpipe.push(download, urlList[i], './catpics/'+ i, function(err:any, data:object){
        // console.log(err);
      });
  }
} 
go();