require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const models = require("./models");
const Post = models.Post;
const User = models.User;

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

// // CREATE POST
app.post("/api/posts", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body } = req.body;
    console.log(userId);
    console.log(title);
    console.log(body);
    const newPost = await Post.create({ title, body, userId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { email, password } = req.body;

    // Find user by email. Adjust according to your database or ORM
    const user = await User.findOne({ where: { email } });

    // If user not found, send an error response
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the one in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, send an error response
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // User is authenticated at this point

    // Create a JWT payload
    const payload = {
      id: user.id,
      email: user.email,
      // Add other required fields
    };

    // Sign the token with a secret key
    const token = jwt.sign(payload, "SECRET", {
      expiresIn: "1h",
    }); // Adjust expiry as needed

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify Token
function verifyToken(req, res, next) {
  console.log("verifyToken ran");
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, "SECRET", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      } else {
        req.user = decoded; // Attach the decoded token (which should include the user info) to the req object
        next();
      }
    });
  } else {
    res.status(403).json({ error: "No token provided" });
  }
}

app.listen(3000, () => {
  console.log("listening on port 3000");
});
