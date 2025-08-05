import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdateBlog }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLike = () => {
    const updatedObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    };
    blogService
      .update(blog.id, updatedObj)
      .then((returnedBlog) => onUpdateBlog(returnedBlog));
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "hide" : "view"}
        </button>
      </div>
      {showAll && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
