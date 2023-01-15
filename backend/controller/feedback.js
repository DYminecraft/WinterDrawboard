// 导入 Feedback model
const Feedback = require("../model/feedback");
// 导入 User model
const User = require("../model/user");
// 获取反馈
exports.get = (req, res) => {
    Feedback.find({})
            .then(databaseReturn => {
                res.status(200).json({message: "获取反馈成功", data: databaseReturn});
            })
            .catch(() => {
                res.status(401).json({message: "获取反馈失败"});
            });
};

// 提交反馈
exports.submit = (req, res) => {
    const feedback = new Feedback({
                                      creator: req.body.clientId,
                                      content: req.body.content
                                  });
    Feedback.create(feedback)
            .then(databaseReturn => {
                res.status(201).json({message: "提交反馈成功", data: databaseReturn});
            })
            .catch(() => {
                res.status(401).json({message: "提交反馈失败"});
            });
};

// 删除反馈
exports.delete = (req, res) => {
    Feedback.findOne({_id: req.body.feedbackId, creator: req.body.clientId})
            .then(databaseReturn => {
                // 如果不存在此用户创建的这条反馈，401
                if (!databaseReturn) res.status(401).json({message: "删除反馈失败"});
                // 如果存在，删除
                return Feedback.deleteOne(databaseReturn);
            })
            .then(databaseReturn => {
                res.status(200).json({message: "删除反馈成功", data: databaseReturn});
            })
            .catch(() => {
                res.status(401).json({message: "删除反馈失败"});
            });
};

// 更改反馈
exports.update = (req, res) => {
    //clientId feedbackId content
    Feedback.findOne({_id: req.body.feedbackId, creator: req.body.clientId})
            .then(databaseReturn => {
                // 如果不存在此用户创建的这条反馈，401
                if (!databaseReturn) res.status(401).json({message: "更改反馈失败"});
                // 如果存在，更新
                return Feedback.updateOne(databaseReturn, {content: req.body.content});
            })
            .then(databaseReturn => {
                res.status(201).json({message: "更改反馈成功", data: databaseReturn});
            })
            .catch(() => {
                res.status(401).json({message: "更改反馈失败"});
            });
};

// 点赞反馈
exports.like = (req, res) => {
    Feedback.findOne({_id: req.body.feedbackId})
            .then(databaseReturn => {
                // 如果不存在这条反馈，401
                if (!databaseReturn) res.status(401).json({message: "点赞反馈失败"});
                // 如果存在，①反馈点赞数加一
                return Feedback.updateOne(databaseReturn, {agreement: databaseReturn.agreement + 1});
            })
            .then(()=> {
                // 如果存在，②用户点赞的反馈加一
                return User.updateOne({_id: req.body.clientId}, {$push: {agreedFeedback: req.body.feedbackId}});
            })
            .then(databaseReturn => {
                res.status(201).json({message: "点赞反馈成功", data: databaseReturn});
            })
            .catch(() => {
                res.status(401).json({message: "点赞反馈失败"});
            });
};