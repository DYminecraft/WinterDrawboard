// Mongodb ORM 库
const mongoose = require("mongoose");

// User collection 蓝图
// 默认创建 _id
const userSchema = mongoose.Schema({
                                       name: {type: String, required: true, unique: true},
                                       nickname: {type: String, required: true, unique: true},
                                       password: {type: String, required: true},
                                       lastDraw: {type: Date, default: new Date("1970")},
                                       agreedFeedback: [{type: mongoose.Schema.Types.ObjectId, ref: "Feedback"}]
                                   });

// 验证「unique: true」的数据是否重复
const mongooseUniqueValidator = require("mongoose-unique-validator");
userSchema.plugin(mongooseUniqueValidator);

// 导出 User collection
module.exports = mongoose.model("User", userSchema);