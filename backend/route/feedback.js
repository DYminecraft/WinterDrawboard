// 定义 router
const express = require("express");
const router = express.Router();

// 导入 feedback controller
const feedbackController = require("../controller/feedback");
const checkAuth = require("../middleware/check-auth");

// 获取反馈
// => {message:string, data:DatabaseObject}
router.get("/get", checkAuth, feedbackController.get);

// 提交反馈
// {clientId:string, content:string} => {message:string, data:DatabaseObject}
router.post("/submit", checkAuth, feedbackController.submit);

// 删除反馈
// {clientId:string, feedbackId:string} => {message:string, data:DatabaseObject}
router.delete("/delete", checkAuth, feedbackController.delete);

// 更改反馈
// {clientId:string, feedbackId:string, content:string} => {message:string, data:DatabaseObject}
router.post("/update", checkAuth, feedbackController.update);

// 点赞反馈
// {clientId:string, feedbackId:string} => {message:string, data:DatabaseObject}
router.post("/like", checkAuth, feedbackController.like);

// 导出 router
module.exports = router;