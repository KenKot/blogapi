import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        const posts = data.posts;
        setPosts(posts);
        console.log(posts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>

          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostList;
