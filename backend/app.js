require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const models = require("./models");
const Post = models.Post;

// GET ALL POSTS (W/ COMMENTS)
// app.get("/api/posts", async (req, res) => {
//   const posts = await Post.findAll({include: [{model: models.Comment}]});
//   res.json({
//     posts,
//   });
// });

// GET ALL POSTS (W/O COMMENTS)
app.get("/api/posts", async (req, res) => {
  try {
    // let posts = await Post.findAll({ where: { isPublished: true } });  //only published posts
    let posts = await Post.findAll();

    // if (posts.length === 0) {
    //   return res.status(404).json({ error: "No posts found" });
    // }

    res.json({ posts });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET POST (W/ COMMENTS)
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: models.Comment }],
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
