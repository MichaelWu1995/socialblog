const { text } = require("body-parser");
const mongoose = require("./mongoose");

var Schema = mongoose.Schema;

var topicSchema = new Schema({
  category: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  created_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  create_time: {
    type: Date,
    default: Date.now,
  },

  last_modified_time: {
    type: Date,
    default: Date.now,
  },
});

topicSchema.static("fetch", function (category, cb) {
  return this.find({ category: category }, cb).sort({
    last_modified_time: "descending",
  });
});

topicSchema.static("findTopicWithUser", function (cb) {
  return this.find({}, cb)
    .populate("created_user") //注意这是联合查询的关键
    .sort({ last_modified_time: "descending" });
});

topicSchema.static("findTopicWithId", function (id, cb) {
  return this.findOne({ _id: id }, cb).populate("created_user"); //注意这是联合查询的关键
});

module.exports = mongoose.model("Topic", topicSchema);
