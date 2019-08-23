# spider
ts编写简易爬虫，爬取数据存入mysql，爬取花瓣网图片，使用nodejs批量下载到本地。

## 编译
  ```
  tsc
  ```

## 运行
- 爬取掘金到数据库
  ```
  node out/app_juejin
  ```
- 爬取豆瓣到数据库
  ```
  node out/app_douban
  ```
- 爬取花瓣并下载图片
  ```
  node out/app_huaban
  ```