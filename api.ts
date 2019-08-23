import axios from 'axios'

// axios.defaults.headers.common['Cookie'] = '';
// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36';
// axios.defaults.headers.common['X-Agent'] = 'Juejin/Web';
 
/**网络请求 */
export const remote_get = function(url: string, params: object) { 
  const promise = new Promise(function (resolve, reject) { 
    axios.get(url, params).then((res: any) => {
        resolve(res.data);
    }, (err: any) => {
        reject(err);
    });
  });
  return promise;
}

export const remote_post = function(url: string, params: object, headers: object) { 
  const promise = new Promise(function (resolve, reject) { 
    axios.post(url, params, {headers: headers}).then((res: any) => {
        resolve(res.data);
    }, (err: any) => {
        reject(err);
    });
  });
  return promise;
}