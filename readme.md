## 用于推送代码到远程服务器

- 安装

`npm install receiver-client`，**应该安装于客户端，服务端安装请看[receiver-server](https://github.com/w724883/receiver-server)**

- 说明

```javascript
var path = require('path');
var receiverClient = require('receiver-client');

/*
**	from 上传目录（绝对路径，必填）
**	to 目标目录（基于部署的根目录，必填）
**	host 发布远程服务器地址（必填）
**	excludes 排除的目录，多个目录用空格分隔（选填）
*/

receiverClient({
	from:path.resolve('./test'),
	to:'../www',
	host:'http://localhost:8999',

});

```
