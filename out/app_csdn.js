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
const api_1 = require("./api");
const cheerio = require("cheerio");
const utils_1 = require("./utils");
const go = () => __awaiter(this, void 0, void 0, function* () {
    const res = yield api_1.remote_get('https://www.csdn.net/nav/web', {});
    // 加载网页
    const $ = cheerio.load(res);
    let urls = [];
    let titles = [];
    // 获取网页中的数据，分别写到两个数组里面
    $('#feedlist_id').find('.list_con').find('.title').find('h2').find('a').each((index, element) => {
        titles.push($(element).text().trim());
        urls.push($(element).attr('href').trim());
    });
    // 打印数组
    console.log(titles, urls);
    // 往数据库里面写入数据
    titles.map((item, index) => {
        utils_1.db('insert into csdn(title,url) values(?,?)', [item, urls[index]], (err, data) => {
            if (data) {
                console.log('提交数据成功！！');
            }
            if (err) {
                console.log(err);
                console.log('提交数据失败');
            }
        });
    });
});
go();
