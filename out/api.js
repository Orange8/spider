"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
// axios.defaults.headers.common['Cookie'] = '';
// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36';
// axios.defaults.headers.common['X-Agent'] = 'Juejin/Web';
/**网络请求 */
exports.remote_get = function (url, params) {
    const promise = new Promise(function (resolve, reject) {
        axios_1.default.get(url, params).then((res) => {
            resolve(res.data);
        }, (err) => {
            reject(err);
        });
    });
    return promise;
};
exports.remote_post = function (url, params, headers) {
    const promise = new Promise(function (resolve, reject) {
        axios_1.default.post(url, params, { headers: headers }).then((res) => {
            resolve(res.data);
        }, (err) => {
            reject(err);
        });
    });
    return promise;
};
