const express = require("express"),
  app = express(),
  port = 3000;

app.set("template engine", "ejs");
app.set("views", "./src/views");

const router = require("./src/routes/router");
app.use("/", router);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
