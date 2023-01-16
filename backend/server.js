// 导入 http 库
const http = require("http");

// 导入 app 并创建服务器
const app = require("./app");
const server = http.createServer(app);

// 服务器监听 3000 端口
server.listen(3000);