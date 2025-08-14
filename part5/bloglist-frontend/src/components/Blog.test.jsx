import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

test("blog renders the title & author, but not URL or number of likes", () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    likes: 11,
  };

  render(<Blog blog={blog} />);

  expect(screen.getByTestId("blog-title")).toBeInTheDocument();
  expect(screen.getByTestId("blog-author")).toBeInTheDocument();
  expect(screen.queryByTestId("blog-url")).toBeNull();
  expect(screen.queryByTestId("blog-likes")).toBeNull();
});

test("URL and likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    likes: 11,
    user: { username: "owner", id: "123" },
  };
  const currentUser = { username: "someone" };

  render(<Blog blog={blog} user={currentUser} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  expect(screen.getByTestId("blog-url")).toBeInTheDocument();
  expect(screen.getByTestId("blog-likes")).toBeInTheDocument();
});
