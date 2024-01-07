import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setComments(data.Comments);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post Detail</h1>
      <Link to={"/"}>
        <h2>home</h2>
      </Link>

      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h2>{comment.body}</h2>
          <h5>
            {comment.authorName} wrote this at {comment.updatedAt}
          </h5>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default PostDetail;
