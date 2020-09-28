const mongoose = require("./mongoose");

const Schema = mongoose.Schema;
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  nickname: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  created_time: {
    type: Date,
    //注意：这里不要写Date.now(),因为会立即调用
    //这里给个方法，Date.now
    //当你new Model的时候，如果你没有传递create_time，则mongoose 就会调用指定的Date.now
    //返回其值为默认值
    default: Date.now,
  },

  last_modified_time: {
    type: Date,
    default: Date.now,
  },

  avatar: {
    type: String,
    default: "/public/img/avatar-default.png",
  },

  bio: {
    type: String,
    default: "",
  },

  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },

  birthday: {
    type: Date,
  },

  status: {
    type: Number,
    //0没有权限限制
    //1不可以评论
    //2可以登录使用
    enum: [0, 1, 2],
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
