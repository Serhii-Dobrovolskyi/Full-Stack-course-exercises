import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("form calls the event handler", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  await user.type(screen.getByTestId("blogForm-title"), "testing a form.");
  await user.type(screen.getByTestId("blogForm-author"), "testing a form..");
  await user.type(screen.getByTestId("blogForm-url"), "testing a form...");
  await user.click(screen.getByTestId("blogForm-button"));

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form.");

});
