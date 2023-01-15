// Mongodb ORM 库
const mongoose = require("mongoose");

// Feedback collection 蓝图
// 默认创建 _id
const feedbackSchema = mongoose.Schema({
                                           creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
                                           content: {type: String, required: true},
                                           agreement: {type: Number, required: true, default: 0}
                                       });

// 导出 Feedback collection
module.exports = mongoose.model("Feedback", feedbackSchema);