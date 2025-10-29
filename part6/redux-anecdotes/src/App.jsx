import { useSelector, useDispatch } from "react-redux";
import { addVote, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const anecdotesInOrderByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(addVote(id));
  };
  const addNewAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.content.value.trim();
    if (anecdote === "") return;
    e.target.content.value = "";
    dispatch(createAnecdote(anecdote));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesInOrderByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input type="text" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
