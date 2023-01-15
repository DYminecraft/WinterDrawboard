// Mongodb ORM 库
const mongoose = require("mongoose");

// Canvas collection 蓝图
// 默认创建 _id
const canvasSchema = mongoose.Schema({
                                         x: {type: Number, required: true},
                                         y: {type: Number, required: true},
                                         color: {type: String, required: true}
                                     });

// 导出 Canvas collection
module.exports = mongoose.model("Canvas", canvasSchema);