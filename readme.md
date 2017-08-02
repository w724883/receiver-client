## 用于推送代码到远程服务器

- 安装

[`npm install receiver-client`](https://www.npmjs.com/package/receiver-client)，**应该安装于客户端，服务端安装请看[receiver-server](https://github.com/w724883/receiver-server)**

- 说明

```javascript
var path = require('path');
var receiverClient = require('receiver-client');

/*
**	参数以数组的形式传值，支持上传多个文件
**	from 上传目录（绝对路径，必填）
**	to 目标主机及推送路径（基于主机的根目录，必填）
**	excludes 排除的目录，多个目录用空格分隔（选填）
*/

receiverClient([{
	from:path.resolve('./test'),
	to:'http://localhost:8999/www'
}]);

```
