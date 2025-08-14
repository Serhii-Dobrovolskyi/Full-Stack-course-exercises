import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          data-testid="blogForm-title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          data-testid="blogForm-author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          data-testid="blogForm-url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button data-testid="blogForm-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
