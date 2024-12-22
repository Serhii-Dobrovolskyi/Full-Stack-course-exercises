import { useState } from "react";
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const calculateAverage = (pos, neg, total) => (pos - neg) / total;
  const calculatePositive = (pos, all) => (pos / all) * 100;

  const goodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);
    setAverage(calculateAverage(updatedGood, bad, updatedAll));
    setPositive(calculatePositive(updatedGood, updatedAll));
  };
  const neutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = good + updatedNeutral + bad;
    setAll(updatedAll);
    setAverage(calculateAverage(good, bad, updatedAll));
    setPositive(calculatePositive(good, updatedAll));
  };
  const badClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = good + neutral + updatedBad;
    setAll(updatedAll);
    setAverage(calculateAverage(good, updatedBad, updatedAll));
    setPositive(calculatePositive(good, updatedAll));
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
