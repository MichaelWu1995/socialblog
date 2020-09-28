const express = require("express");
const router = express.Router();
const upload = require("../multer");
var md5 = require("blueimp-md5");
var User = require("../models/user");
var Topic = require("../models/topic");
var Comment = require("../models/comment");

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", async (req, res, next) => {
  //1.获取表单数据
  //2.查询数据库用户密码是否正确
  //3.发送响应
  var body = req.body;
  try {
    const user = await User.findOne({
      email: body.email,
      password: md5(md5(body.password)),
    });

    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: "Email or password is invaild!",
      });
    }

    //用户存在，登录成功，记录登录状态
    req.session.user = user;

    res.status(200).json({
      err_code: 0,
      message: "Ok",
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", (req, res) => {
  //清除登录状态
  //重定向到首页
  req.session.user = null;
  res.redirect("/account/login");
});

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.get("/settings/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/account/login");
  }
  res.render("./settings/profile.html", {
    user: req.session.user,
  });
});

router.post(
  "/settings/profile",
  upload.single("avatar"),
  async (req, res, next) => {
    var updateObj = {};
    const query = { email: req.session.user.email };
    var updatedUser = {};
    if (req.file) {
      updateObj = {
        ...req.body,
        avatar: "/" + req.file.path,
        last_modified_time: new Date(),
      };
    } else {
      updateObj = {
        nickname: req.body.nickname,
        bio: req.body.bio,
        birthday: req.body.birthday,
        gender: req.body.gender,
        last_modified_time: new Date(),
      };
    }

    try {
      if (updateObj.nickname === req.session.user.nickname) {
        updatedUser = await User.findOneAndUpdate(query, updateObj, {
          new: true,
        });
        req.session.user = updatedUser;
        return res.status(200).json({
          err_code: 0,
          message: "Ok",
        });
      }

      if (await User.findOne({ nickname: updateObj.nickname })) {
        return res.status(200).json({
          err_code: 1,
          message: "This nickname has been selected. Please select another",
        });
      }

      //Update user
      updatedUser = await User.findOneAndUpdate(query, updateObj, {
        new: true,
      });
      req.session.user = updatedUser;
      res.status(200).json({
        err_code: 0,
        message: "Ok",
      });
    } catch (err) {
      return next(err);
    }
  }
);

router.get("/settings/admin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/account/login");
  }
  res.render("./settings/admin.html", {
    user: req.session.user,
  });
});

router.post("/settings/admin", async (req, res, next) => {
  try {
    const id = req.session.user._id;
    var user = await User.findById(id);
    var body = req.body;
    var current_password = md5(md5(body.current_password));
    var new_password = md5(md5(body.new_password));
    var updateObj = {
      password: new_password,
      last_modified_time: new Date(),
    };
    if (user.password !== current_password) {
      return res.status(200).json({
        err_code: 1,
        message: "The current password doesn't match",
      });
    } else {
      updatedUser = await User.updateOne({ _id: id }, updateObj, { new: true });
      req.session.user = updatedUser;
      res.status(200).json({
        err_code: 0,
        message: "Ok",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/delete", async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/account/login");
    }
    await User.deleteOne({ _id: req.session.user._id });
    await Topic.deleteMany({ created_user: req.session.user._id });
    await Comment.deleteMany({ created_user: req.session.user._id });
    req.session.user = null;
    res.redirect("/");
  } catch (err) {
    next(err.message);
  }
});

router.post("/register", async (req, res, next) => {
  var body = req.body;
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: "This email has been registered.Please change another one!",
      });
    }
    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: "This nickname has been chosen.Please change another one!",
      });
    }
    //对密码进行加密
    body.password = md5(md5(body.password));
    //创建用户，进行注册
    var user = await new User(body).save();

    //注册成功，使用session 记录用户啊的登录状态
    req.session.user = user;

    res.status(200).json({
      err_code: 0,
      message: "Ok",
    });

    //服务端重定向只针对同步请求才有效，异步请求无效
    //res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
