// 定义 router
const express = require("express");
const router = express.Router();

// 导入 user controller
const UserController = require("../controller/user");

// 用户创建 测试用
// => {message:string, {message:string, data:DatabaseObject}
router.get("/register", UserController.register);

// 用户登录
// {nameOrNickname:string, password:string} => {message:string, token:string, expiresIn:number}
router.post("/login", UserController.login);

// 导出 router
module.exports = router;