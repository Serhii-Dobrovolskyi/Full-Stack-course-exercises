import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });
  const calculateAverage = (pos, neg, total) => (pos - neg) / total;
  const calculatePositive = (pos, all) => (pos / all) * 100;

  const goodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1,
      all: clicks.good + 1 + clicks.neutral + clicks.bad,
      average: calculateAverage(
        clicks.good + 1,
        clicks.bad,
        clicks.good + 1 + clicks.neutral + clicks.bad
      ),
      positive: calculatePositive(
        clicks.good + 1,
        clicks.good + 1 + clicks.neutral + clicks.bad
      ),
    };
    setClicks(newClicks);
  };
  const neutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
      all: clicks.good + clicks.neutral + 1 + clicks.bad,
      average: calculateAverage(
        clicks.good,
        clicks.bad,
        clicks.good + clicks.neutral + 1 + clicks.bad
      ),
      positive: calculatePositive(
        clicks.good,
        clicks.good + clicks.neutral + 1 + clicks.bad
      ),
    };
    setClicks(newClicks);
  };
  const badClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1,
      all: clicks.good + clicks.neutral + clicks.bad + 1,
      average: calculateAverage(
        clicks.good,
        clicks.bad + 1,
        clicks.good + clicks.neutral + clicks.bad + 1
      ),
      positive: calculatePositive(
        clicks.good,
        clicks.good + clicks.neutral + clicks.bad + 1
      ),
    };
    setClicks(newClicks);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      {clicks.all === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <Statistics
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          all={clicks.all}
          average={clicks.average}
          positive={clicks.positive}
        />
      )}
    </div>
  );
};

export default App;
