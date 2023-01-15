// 导入 User model
const User = require("../model/user");

// 加密、验证密码库
const bcrypt = require("bcrypt");

// 加密、解密token库
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = "iWZqxl4IDgeyez7YAFauouGcFOCu4LQCYyrOXgLCttzjGZyMHjQj1Yf8tDkbaQWyWymFkRgp7M61jiQM4Oy4x6O42F0S5VyM36p2";

// 用户创建 测试用
exports.register = (req, res) => {
    // 要创建的用户信息
    const clientUser = {
        name: "董一玮",
        nickname: "Annst",
        password: "Annst054evr"
    };

    // 密码加密
    bcrypt.hash(clientUser.password, 10)
          .then(hash => {
              // 加密后的用户信息
              return user = new User({
                                         name: clientUser.name,
                                         nickname: clientUser.nickname,
                                         password: hash
                                     });
          })
          .then(user => {
              // 保存至数据库
              return user.save();
          })
          .then(databaseReturn => {
              // 如果创建成功，返回数据
              res.status(201).json({message: "创建用户成功", data: databaseReturn});
          })
          .catch(err => {
              // 发生未知错误
              console.log("创建用户未知错误：", err);
              return res.status(401).json({message: "创建用户失败"});
          });
};

// 用户登录
exports.login = (req, res) => {
    // 客户端输入的用户信息
    const clientUser = {
        name: req.body.data.name,
        nickname: req.body.data.nickname,
        password: req.body.data.password
    };

    // 定义查询条件: 姓名或者昵称相同
    const filter = {
        $or: [
            {name: clientUser.name},
            {nickname: clientUser.nickname}
        ]
    };

    // 查询符合条件的帐号
    User.findOne(filter)
        .then(fetchedUser => {
            // 没有对应账号,401
            if (!fetchedUser) return res.status(401).json({message: "用户登录失败"});

            // 有对应账号,判断密码是否正确
            return Promise.all([bcrypt.compare(clientUser.password, fetchedUser.password), fetchedUser]);
        })
        .then(([isCorrect, fetchedUser]) => {
            // 密码错误,401
            if (!isCorrect) return res.status(401).json({message: "用户登录失败"});

            // 密码正确,定义 token 并返回
            const token = jwt.sign({
                                       Id: fetchedUser._id,
                                       name: fetchedUser.name
                                   },
                                   secretOrPrivateKey,
                                   {expiresIn: "1h"});
            res.status(200).json({message: "用户登录成功", token: token});
        })
        .catch(err => {
            // 发生未知错误
            console.log("用户登录未知错误：", err);
            return res.status(401).json({message: "用户登录失败"});
        });
};