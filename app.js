require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const models = require("./models");
const Post = models.Post;

// GET
app.get("/api/posts", async (req, res) => {
  const posts = await Post.findAll({ include: [{ model: models.Comment }] });
  res.json({
    posts,
  });
});

// // POST
// app.post("/api/posts", async (req, res) => {
//     const posts = await Post.findAll();
//     console.log("~~~~~~~~~~~~~~~~~~~~~~~");
//     console.log(posts);
//     console.log("~~~~~~~~~~~~~~~~~~~~~~~");
//     res.json({
//       posts,
//     });
//   });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
