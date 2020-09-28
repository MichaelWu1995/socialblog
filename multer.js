const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //文件上传成功后会放入public下的img文件夹
    cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  },
});
var upload = multer({
  storage: storage,
});

module.exports = upload;
