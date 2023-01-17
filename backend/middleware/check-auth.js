// 加密、验证token库
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = "iWZqxl4IDgeyez7YAFauouGcFOCu4LQCYyrOXgLCttzjGZyMHjQj1Yf8tDkbaQWyWymFkRgp7M61jiQM4Oy4x6O42F0S5VyM36p2";

// 中间件：检查用户客户端是否有合法 token
module.exports = (req, res, next) => {
    try {
        // 获取 req.headers 中自定义的授权信息
        const clientToken = req.headers.authorization.split(" ")[1];

        // 如果有，验证 token
        const decodedClientData = jwt.verify(clientToken, secretOrPrivateKey);

        // 如果有，在 req 添加用户 id，便于后续与 canvas 和 feedback 操作关联
        req.clientId = decodedClientData.id;

        // 调用后续的中间件
        next();
    } catch (err) {
        // 如果没有
        res.status(401).json({message: "用户没有登录"});
    }
};