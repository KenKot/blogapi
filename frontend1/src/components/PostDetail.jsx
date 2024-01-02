import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {/* Render other post details */}
    </div>
  );
};

export default PostDetail;
