// 定义 router
const express = require("express");
const router = express.Router();

// 导入 check-auth 中间件
const checkAuth = require("../middleware/check-auth");

// 导入 canvas controller
const CanvasController = require("../controller/canvas");

// 初始化绘板 测试用
router.get("/init", CanvasController.init);

// 获取绘板
// => {message:string, data:DatabaseObject}
router.get("/get", checkAuth, CanvasController.get);

// 画绘板
// {clientId:string, x:number, y:number, color:string} => {message:string, data:DatabaseObject}
router.post("/draw", checkAuth, CanvasController.draw);

// 导出 router
module.exports = router;