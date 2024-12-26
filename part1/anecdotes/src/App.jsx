import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(
    Array(anecdotes.length).fill(0)
  );
  const clickVote = () => {
    const newArray = [...anecdotesVotes];
    newArray[selected] += 1;
    setAnecdotesVotes(newArray);
  };
  const findMaxIndex = () =>
    anecdotesVotes.indexOf(Math.max(...anecdotesVotes));
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {anecdotesVotes[selected]}</p>
      <button onClick={clickVote}>vote</button>
      <button
        onClick={() =>
          setSelected(Math.ceil(Math.random() * anecdotes.length) - 1)
        }
      >
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[findMaxIndex()]}</p>
      <span>has {anecdotesVotes[findMaxIndex()]}</span>
    </div>
  );
};

export default App;
