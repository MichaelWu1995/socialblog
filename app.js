const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const moment = require("moment");
const template = require("art-template");
const favicon = require("serve-favicon");

app.use("/public/", express.static(path.join(__dirname, "public")));
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules")));

app.use(favicon(path.join(__dirname, "public/img/favicon.ico")));

//在node,有很多第三方模板引擎都可以使用，不是只有art-template
//ejs,jade(pug),handlebars,nunjucks
// <%%>
// {{}}
app.engine("html", require("express-art-template"));
app.set("views", path.join(__dirname, "views")); //默认是views目录，可以随意改

//配置表单post请求体插件(注意：一定要在app.use(router)前)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//在Express这个框架中，默认不支持session和cookie
//但是有第三方中间件:express-session来解决
//配置好后，我们就可以通过req.session来访问和设置session 成员了
//注意：一定要在app.use(router)前
//添加session 数据 req.session.foo = "bar"
//访问session 数据 req.session.foo
app.use(
  session({
    //配置加密字符串，它会在原有基础上和这个字符拼接起来去加密
    //目的是为了增加安全性，防止客户端恶意伪造
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true, //无论你是否使用session, 我都默认直接给你分配一把钥匙
  })
);

//把路由挂载到app上
//app.use(router);

app.use("/", require("./routes/home"));
app.use("/account", require("./routes/account"));
app.use("/topic", require("./routes/topic"));
app.use("/comment", require("./routes/comment"));

//404中间件
app.use((req, res, next) => {
  res.render("404.html");
});

//全局错误中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err.message,
  });
});

template.defaults.imports.dateFormat = function (date, format) {
  return moment(date).format(format);
};

template.defaults.imports.relativeDate = function (date) {
  return moment(date).startOf("minute").fromNow();
};

app.listen(5000, () => {
  console.log("Your app is running at port 5000...");
});
