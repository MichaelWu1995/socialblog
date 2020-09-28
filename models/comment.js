const mongoose = require("./mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },

  created_time: {
    type: Date,
    default: Date.now,
  },

  created_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  topic_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

commentSchema.static("findCommentWithUser", function (id, cb) {
  return this.find({ topic_id: id }, cb)
    .populate("created_user") //注意这是联合查询的关键
    .sort({ created_time: "descending" });
});

module.exports = mongoose.model("Comment", commentSchema);
