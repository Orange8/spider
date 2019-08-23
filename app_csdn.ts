import { remote_get } from './api';
import * as cheerio from 'cheerio';
import { db } from './utils';

const go = async () => { 
  const res: any = await remote_get('https://www.csdn.net/nav/web', {});
  // 加载网页
  const $ = cheerio.load(res);
  let urls: string[] = [];
  let titles: string[] = [];
  // 获取网页中的数据，分别写到两个数组里面
  $('#feedlist_id').find('.list_con').find('.title').find('h2').find('a').each((index, element) => { 
      titles.push($(element).text().trim()); 
      urls.push($(element).attr('href').trim()); 
  })
  // 打印数组
  console.log(titles, urls);
  // 往数据库里面写入数据
  titles.map((item, index) => {
    db('insert into csdn(title,url) values(?,?)', [item, urls[index]], (err: any, data: any) => {
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