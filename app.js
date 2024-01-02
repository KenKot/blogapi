require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const models = require("./models");
const Post = models.Post;

app.get("/api/posts", async (req, res) => {
  const posts = await Post.findAll();
  console.log("~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(posts);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~");
  res.json({
    posts,
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
