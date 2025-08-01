import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();

    if (author.length && title.length) {
      const blogObj = {
        title,
        author,
        url,
      };
      blogFormRef.current.toggleVisible();
      blogService.create(blogObj).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle("");
        setAuthor("");
        setUrl("");
      });
      setErrorMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage && (
          <Notification message={errorMessage} style={"error"} />
        )}
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && (
        <Notification message={errorMessage} style={"success"} />
      )}
      <p>
        {user.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            setUser(null);
          }}
        >
          log out
        </button>
      </p>
      <h3>create new</h3>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
