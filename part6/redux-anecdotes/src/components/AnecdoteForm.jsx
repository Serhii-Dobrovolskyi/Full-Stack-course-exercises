import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.content.value.trim();
    if (anecdote === "") return;
    e.target.content.value = "";
    dispatch(createAnecdote(anecdote));
  };
  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input type="text" name={"content"} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
