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
const utils_1 = require("./utils");
const go = () => __awaiter(this, void 0, void 0, function* () {
    let params = {
        "operationName": "",
        "query": "",
        "variables": {
            "category": "5562b415e4b00c57d9b94ac8",
            "first": 20,
            "after": "",
            "order": "POPULAR"
        },
        "extensions": {
            "query": {
                "id": "653b587c5c7c8a00ddf67fc66f989d42"
            }
        }
    };
    let headers = {
        'X-Agent': 'Juejin/Web'
    };
    const res = yield api_1.remote_post('https://web-api.juejin.im/query', params, headers);
    // const res: any = await remote_get('https://juejin.im/welcome/frontend', {});
    // const res: any = await remote_get('https://juejin.im/timeline/frontend', {});
    console.log(res);
    let dataList = {};
    dataList = res.data.articleFeed.items.edges;
    // 往数据库里面写入数据
    dataList.map((item) => {
        utils_1.db('insert into juejin(title,url) values(?,?)', [item.node.title, item.node.originalUrl], (err, data) => {
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
