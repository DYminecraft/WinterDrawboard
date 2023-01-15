// Mongodb ORM 库
const mongoose = require("mongoose");

// Drawrecord collection 蓝图
// 默认创建 _id
const drawrecordSchema = mongoose.Schema({
                                       creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
                                       datetime: {type: Date, required: true},
                                       x: {type: Number, required: true},
                                       y: {type: Number, required: true},
                                       color: {type: String, required: true}
                                   });

// 导出 Drawrecord collection
module.exports = mongoose.model("Drawrecord", drawrecordSchema);