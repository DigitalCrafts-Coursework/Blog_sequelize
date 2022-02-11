const express = require("express"),
  router = express.Router(),
  { Sequelize, DataTypes, Op } = require("sequelize"),
  database = require("../../config/database.js"),
  models = require("../../models/index.js"),
  { DateTime } = require("luxon");

router.get("/", async (req, res) => {
  try {
    database.sync({ force: true });
    let blogPosts = await models.Post.findAll();
    for (let i = 0; i < blogPosts.length; i++) {
      // let simplifiedBlogPosts = blogPosts[i].get({ plain: true });
      // console.log(simplifiedBlogPosts[i]);
      //convert sequelize "createdAt" date to simple date(using Luxon pkg)
      const isoDate = new Date(blogPosts[i].createdAt).toISOString();
      const date = DateTime.fromISO(isoDate);
      const humanReadable = date.toLocaleString(DateTime.DATE_MED);
      console.log(humanReadable); // Feb 11, 2022
      blogPosts[i].createdAt = `${humanReadable}`;
      console.log(blogPosts[i].createdAt); //2022-02-11T16:34:42.451Z (not changing for some reason, has to do with sequelize object)
    }
    // console.log(blogPosts[0].get({ plain: true }));
    // const date = DateTime.fromISO("2022-02-11T18:12:52.567Z");
    // const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);
    // console.log(humanReadable);

    res.render("home", { blogPosts: blogPosts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/newpost", (req, res) => {
  res.render("newpost");
});

router.post("/newpost", async (req, res) => {
  try {
    await database.sync({ force: true });
    await models.Post.create({ title: req.body.title, post: req.body.post });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
