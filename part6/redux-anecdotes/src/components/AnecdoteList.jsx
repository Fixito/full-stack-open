const AnecdoteList = ({ anecdotes, vote }) => {
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <article key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AnecdoteList;
