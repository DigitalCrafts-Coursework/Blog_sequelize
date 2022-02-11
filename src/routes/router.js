const express = require("express"),
  router = express.Router(),
  { Sequelize, DataTypes, Op } = require("sequelize"),
  database = require("../../config/database.js"),
  models = require("../../models/index.js");

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/post", async (req, res) => {
  try {
    await database.sync({ force: true });
    await models.Post.create({ title: req.body.title, post: req.body.post });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
