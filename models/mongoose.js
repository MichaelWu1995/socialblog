const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/blog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      throw Error("Fail to connect database...");
    } else {
      console.log("Successful connection to database...");
    }
  }
);
module.exports = mongoose;
