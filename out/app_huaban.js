"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const fs = require('fs');
const Bagpipe = require('bagpipe');
const api_1 = require("./api");
const go = () => __awaiter(this, void 0, void 0, function* () {
    let params = {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        responseType: 'json',
    };
    // const res: any = await remote_get('https://huaban.com/explore/cat/', params);
    const res = yield api_1.remote_get('https://huaban.com/explore/cat/?max=2515078132&limit=100&wfl=1', params);
    // console.log(res);
    let urls = [];
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
    });
    console.log(urlList);
    let num = 0;
    var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            let fileType = res.headers['content-type'].split('/')[1];
            num++;
            console.log(num);
            filename = filename + '.' + fileType;
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    var bagpipe = new Bagpipe(10, { timeout: 500 });
    for (var i = 0; i < urlList.length; i++) {
        bagpipe.push(download, urlList[i], './catpics/' + i, function (err, data) {
            // console.log(err);
        });
    }
});
go();
