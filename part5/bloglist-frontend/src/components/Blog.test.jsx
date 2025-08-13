import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

test("blog renders the title & author, but not URL or number of likes", () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    likes: 11,
  };

  render(<Blog blog={blog} />);

  const elemTitle = screen.getByTestId("blog-title");
  const elemAuthor = screen.getByTestId("blog-author");
  const elemUrl = screen.queryByTestId("blog-url");
  const elemLikes = screen.queryByTestId("blog-likes");

  expect(screen.getByTestId("blog-title")).toBeDefined();
  expect(screen.getByTestId("blog-author")).toBeDefined();
  expect(screen.queryByTestId("blog-url")).toBeNull();
  expect(screen.queryByTestId("blog-likes")).toBeNull();
});
