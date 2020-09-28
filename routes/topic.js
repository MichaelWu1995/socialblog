const express = require("express");
const router = express.Router();
var Topic = require("../models/topic");
var Comment = require("../models/comment");
const multer = require("multer");
const upload = multer();

router.get("/new", (req, res, next) => {
  res.render("./topic/new.html", {
    user: req.session.user,
  });
});

router.post("/new", upload.fields([]), async (req, res, next) => {
  var body = req.body;
  var topic = {
    ...body,
    created_user: req.session.user._id,
  };
  try {
    if (await Topic.findOne({ title: topic.title })) {
      return res.status(200).json({
        err_code: 1,
        message: "The title is duplicated. Please change another...",
      });
    }

    await new Topic(topic).save();

    res.status(200).json({
      err_code: 0,
      message: "Ok",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    var topic = await Topic.findTopicWithId(req.params.id);
    var comment = await Comment.findCommentWithUser(req.params.id);
    topic = JSON.stringify(topic);
    topic = JSON.parse(topic);
    comment = JSON.stringify(comment);
    comment = JSON.parse(comment);
    res.render("./topic/show.html", {
      topic: topic,
      user: req.session.user,
      comment: comment,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    var topic = await Topic.findOne({ _id: req.params.id });
    if (
      !req.session.user ||
      req.session.user._id !== topic.created_user.toString()
    ) {
      return res.redirect("/");
    }
    res.render("./topic/edit.html", {
      user: req.session.user,
      topic: topic,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/edit/:id", upload.fields([]), async (req, res, next) => {
  try {
    var body = req.body;
    var updateObj = {
      title: body.title,
      content: body.content,
      last_modified_time: new Date(),
    };

    var query = { _id: body.id };
    const previousTopic = await Topic.findOne(query);
    if (previousTopic.title === updateObj.title) {
      await Topic.findOneAndUpdate(query, updateObj);
      return res.status(200).json({
        err_code: 0,
        message: "Ok",
      });
    }

    if (await Topic.findOne({ title: body.title })) {
      return res.status(200).json({
        err_code: 1,
        message: "The title is duplicated. Please change another...",
      });
    }

    await Topic.findOneAndUpdate(query, updateObj);
    res.status(200).json({
      err_code: 0,
      message: "Ok",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    var topic = await Topic.findOne({ _id: req.params.id });
    if (
      !req.session.user ||
      req.session.user._id !== topic.created_user.toString()
    ) {
      return res.redirect("/");
    }
    await Topic.deleteOne({ _id: req.params.id });
    await Comment.deleteMany({ topic_id: req.params.id });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
