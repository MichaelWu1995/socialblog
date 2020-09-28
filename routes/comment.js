const express = require("express");
const router = express.Router();
var Comment = require("../models/comment");
const multer = require("multer");
const upload = multer();

router.post("/new", upload.fields([]), async (req, res, next) => {
  try {
    var comment = {
      ...req.body,
      created_user: req.session.user._id,
    };
    if (
      await Comment.findOne({
        created_user: comment.created_user,
        topic_id: comment.topic_id,
      })
    ) {
      return res.status(200).json({
        err_code: 1,
        message: "You have already commented this topic.",
      });
    }

    await Comment(comment).save();

    res.status(200).json({
      err_code: 0,
      message: "Ok",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
