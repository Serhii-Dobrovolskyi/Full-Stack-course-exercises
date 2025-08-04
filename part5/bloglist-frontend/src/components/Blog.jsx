import { useState } from "react";

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.user.username}</div>
        </>
      )}
    </div>
  );
  // return (
  //   <div style={blogStyle}>
  //     <div>
  //       {blog.title} {blog.author}{" "}
  //       <button onClick={() => setShowAll(!showAll)}>hide</button>
  //     </div>
  //     <div>{blog.url}</div>
  //     <div>{blog.likes}</div>
  //     <div>{blog.user.username}</div>
  //   </div>
  // );
};

export default Blog;
