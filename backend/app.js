// 定义 app
const express = require("express");
const app = express();

//连接数据库
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// mongoose.connect("mongodb+srv://Annst:Annst054evr@cluster0.f7wyge2.mongodb.net/WinterDrawboard?retryWrites=true&w=majority")
mongoose.connect("mongodb://127.0.0.1:27017/WinterDrawboard?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1?")
        .then(() => {
            console.log("数据库连接成功");
        })
        .catch((err) => {
            console.log("数据库连接失败：", err);
        });

// 启用CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
});

// 将 req 中的数据提取到 req.body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// 用户创建、登录
const userRoute = require("./route/user");
app.use("/api/user", userRoute);

// 绘板改、查
const canvasRoute = require("./route/canvas");
app.use("/api/canvas", canvasRoute);

// 反馈增、删、改、查、点赞
const feedbackRoute = require("./route/feedback");
app.use("/api/feedback", feedbackRoute);

// 对于其余访问的链接，404 NOT FOUND
app.use("**", (req, res) => {
    const User = require("./model/user");
    User.findOne({nickname: "qAnnst"})
        .then(databaseReturn => {
            console.log(databaseReturn);
        });
    res.status(404).json({message: "404 NOT FOUND"});
});

//导出 app
module.exports = app;