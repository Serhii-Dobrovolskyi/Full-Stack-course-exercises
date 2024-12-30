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
  });
  const calculateAll = () => clicks.good + clicks.neutral + clicks.bad;
  const calculateAverage = () => (clicks.good - clicks.bad) / calculateAll();
  const calculatePositive = () => (clicks.good / calculateAll()) * 100;

  const goodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1,
    };
    setClicks(newClicks);
  };
  const neutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
    };
    setClicks(newClicks);
  };
  const badClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1,
    };
    setClicks(newClicks);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      {!calculateAll() ? (
        <h3>No feedback given</h3>
      ) : (
        <Statistics
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          all={calculateAll()}
          average={calculateAverage()}
          positive={calculatePositive()}
        />
      )}
    </div>
  );
};

export default App;
