// 导入 Canvas model
const Canvas = require("../model/canvas");
// 导入 Drawrecord model
const Drawrecord = require("../model/drawrecord");
// 导入 User model
const User = require("../model/user");

// 初始化绘板 测试用 很慢 求求了 我只想执行这个破玩意儿一次！
exports.init = () => {
    // 乱写一堆数据
    for (let i = 0; i < 240; i++) {
        for (let j = 0; j < 400; j++) {
            Canvas.create({
                              x: i,
                              y: j,
                              color: "#aaaaaa80"
                          });
        }
    }
};

// 获取绘板
exports.get = (req, res) => {
    // 只要 x y color 的值
    Canvas.find({}, {_id: false, x: true, y: true, color: true})
          .then(databaseReturn => {
              res.status(200).json({message: "获取绘板成功", data: databaseReturn});
          })
          .catch(() => {
              res.status(401).json({message: "获取绘板失败"});
          });
};

// 绘板绘画
exports.draw = (req, res) => {
    // x y color clientId
    // 先找到 req.clientId 对应的用户
    User.findOne({_id: req.body.clientId})
        .then(databaseReturn => {
            // 如果没有该用户
            if (!databaseReturn) return res.status(401).json({message: "绘板绘画失败"});

            // 如果有，距离上次绘画的时间，是否过了10s
            const lastDraw = Date.parse(databaseReturn.lastDraw);
            const now = new Date();

            if (Date.parse(now) - lastDraw < 10 * 1000) return res.status(401).json({message: "绘板绘画失败"});
            // 如果没过，401

            // 如果过了，①更新lastDraw数据
            return Promise.all(User.updateOne({_id: req.body.clientId}, {lastDraw: now.toISOString()}), now);
        })
        .then((databaseReturn, now) => {
            // ②更新绘画记录
            const drawrecord = new Drawrecord({
                                                  creator: req.body.clientId,
                                                  datetime: now.toISOString(),
                                                  x: req.body.x,
                                                  y: req.body.y,
                                                  color: req.body.color
                                              });
            return Drawrecord.create(drawrecord);
        })
        .then(() => {
            // ③更新绘板数据
            return Canvas.updateOne({x: req.body.x, y: req.body.y}, {color: req.body.color});
        })
        .then(()=>{
            res.status(201).json({message: "用户/绘板/绘画记录更新成功"});
        })
        .catch(() => {
            res.status(401).json({message: "用户/绘板/绘画记录更新失败"});
        });
}
;