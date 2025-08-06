import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdateBlog, onDeleteBlog, user }) => {
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
      user: blog.user.id,
    };
    blogService.update(blog.id, updatedObj).then((returnedBlog) => {
      returnedBlog.user = blog.user;
      onUpdateBlog(returnedBlog);
    });
  };
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then(() => {
        onDeleteBlog(blog.id);
      });
    }
  };
  const testFunc = () => {
    user.username === blog.user.username
      ? console.log(true)
      : console.log(false);
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
          {user.username === blog.user.username && (
            <button onClick={removeBlog}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
