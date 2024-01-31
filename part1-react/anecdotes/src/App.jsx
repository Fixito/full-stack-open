import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() =>
    Array.from({ length: anecdotes.length }, () => 0)
  );
  const mostVotes = Math.max(...votes);
  const mostVotedAnecdoteIndex = votes.findIndex((vote) => vote === mostVotes);

  const getRandomIndex = () => {
    let index = 0;

    while (selected === index) {
      index = Math.floor(Math.random() * anecdotes.length);
    }

    return index;
  };

  const addVote = (index) => {
    setVotes((prevState) => {
      const newVotes = [...prevState];
      newVotes[index] += 1;
      return newVotes;
    });
  };

  return (
    <main>
      <h1>Anecdotes</h1>

      <section>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes.</p>
        <div>
          <button onClick={() => addVote(selected)}>Vote</button>
          <button onClick={() => setSelected(getRandomIndex())}>
            Next anecdote
          </button>
        </div>
      </section>

      <section>
        <h2>Anecdote with the most votes</h2>
        <p>{anecdotes[mostVotedAnecdoteIndex]}</p>
        <p>has {mostVotes} votes.</p>
      </section>
    </main>
  );
};

export default App;
