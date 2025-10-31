import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((i) => i.content.includes(filter))
  );

  const anecdotesInOrderByVotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  );
  const vote = (id) => {
    dispatch(addVote(id));
  };
  return (
    <>
      {anecdotesInOrderByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
