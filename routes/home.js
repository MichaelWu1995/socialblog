const express = require("express");
const router = express.Router();
var Topic = require("../models/topic");
var Comment = require("../models/comment");
const multer = require("multer");
const upload = multer();
const itemPerPage = 5;

var homepage = async function (req, res, next) {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");
    var pageNumber = parseInt(req.query.page) || 1;
    var all_slice = allArray.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
    var all_topic = await getCommentNumber(all_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: all_topic,
    });
  } catch (err) {
    next(err.message);
  }
};

router.get("/", homepage);
router.get("/all", homepage);
router.get("/home", homepage);

router.get("/sports", async (req, res, next) => {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");

    var pageNumber = parseInt(req.query.page) || 1;
    var sports_slice = sportsArray.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
    var sports_topic = await getCommentNumber(sports_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: sports_topic,
    });
  } catch (err) {
    next(err.message);
  }
});

router.get("/diet", async (req, res, next) => {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");

    var pageNumber = parseInt(req.query.page) || 1;
    var diet_slice = dietArray.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
    var diet_topic = await getCommentNumber(diet_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: diet_topic,
    });
  } catch (err) {
    next(err.message);
  }
});

router.get("/movie", async (req, res, next) => {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");

    var pageNumber = parseInt(req.query.page) || 1;
    var movie_slice = movieArray.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
    var movie_topic = await getCommentNumber(movie_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: movie_topic,
    });
  } catch (err) {
    next(err.message);
  }
});

router.get("/tourism", async (req, res, next) => {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");

    var pageNumber = parseInt(req.query.page) || 1;
    var tourism_slice = tourismArray.slice(
      (pageNumber - 1) * 5,
      pageNumber * 5
    );
    var tourism_topic = await getCommentNumber(tourism_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: tourism_topic,
    });
  } catch (err) {
    next(err.message);
  }
});

router.get("/others", async (req, res, next) => {
  try {
    var allArray = await Topic.find().sort({
      last_modified_time: "descending",
    });
    var sportsArray = await Topic.fetch("sports");
    var dietArray = await Topic.fetch("diet");
    var movieArray = await Topic.fetch("movie");
    var tourismArray = await Topic.fetch("tourism");
    var othersArray = await Topic.fetch("others");

    var pageNumber = parseInt(req.query.page) || 1;
    var others_slice = othersArray.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
    var others_topic = await getCommentNumber(others_slice);

    res.render("index.html", {
      user: req.session.user,
      nav: {
        all: allArray,
        sports: sportsArray,
        diet: dietArray,
        movie: movieArray,
        tourism: tourismArray,
        others: othersArray,
      },
      topic: others_topic,
    });
  } catch (err) {
    next(err.message);
  }
});

async function getCommentNumber(array) {
  var commentArray = [];
  for (item of array) {
    const comment = await Comment.find({ topic_id: item.id });
    commentArray.push({
      id: item.id,
      image: item.image,
      title: item.title,
      last_modified_time: item.last_modified_time,
      number: comment.length,
    });
  }
  return commentArray;
}

router.post("/", async (req, res) => {
  var search_result = new RegExp(req.body.title, "i");
  var result = await Topic.find({
    title: search_result,
  }).sort({ category: "ascending" });

  var send_back = [];
  result.forEach((item) => {
    send_back.push({
      label: item.title,
      category: item.category,
      image: item.image,
    });
  });

  if (result) {
    return res.status(200).json({
      err_code: 0,
      topic: send_back,
    });
  } else {
    return res.status(200).json({
      err_code: 1,
      topic: "No matches Found",
    });
  }
});

router.post("/search", upload.fields([]), async (req, res) => {
  try {
    var search_result = new RegExp(req.body.title, "i");
    var result = await Topic.findOne({
      title: search_result,
    });
    if (!result) {
      return res.status(200).json({
        err_code: 1,
        message: "We can't find this topic. Please change another.",
      });
    } else {
      return res.status(200).json({
        err_code: 0,
        message: "Ok",
        id: result.id,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
