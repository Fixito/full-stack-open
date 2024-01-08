import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <main>
      <h1>Unicafe</h1>

      <section>
        <h2>Give Feedback</h2>

        <div>
          <Button text={'good'} onClick={() => setGood(good + 1)} />
          <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
          <Button text={'bad'} onClick={() => setBad(bad + 1)} />
        </div>
      </section>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = `${(good / all) * 100} %`;

  if (!good && !neutral && !bad) {
    return (
      <section>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={all} />
          <StatisticsLine text='average' value={average} />
          <StatisticsLine text='positive' value={positive} />
        </tbody>
      </table>
    </section>
  );
};

const StatisticsLine = ({ text, value }) => (
  <tr>
    <th scope='row'>{text}</th>
    <td>{value}</td>
  </tr>
);

export default App;
