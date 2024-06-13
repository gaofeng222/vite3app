const express = require("express");
const app = express();
const uploadRouter = require("./router/uploadRouter.cjs");

//express 跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method == "OPTIONS") {
    res.sendStatus(200); /*让options请求快速返回*/
  } else {
    next();
  }
});

app.use("/upload", uploadRouter);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
