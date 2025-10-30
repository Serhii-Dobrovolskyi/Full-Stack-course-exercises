import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm"

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const anecdotesInOrderByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(addVote(id));
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
      <AnecdoteForm/>
    </div>
  );
};

export default App;
