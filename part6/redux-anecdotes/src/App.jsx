import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote, voteForAnecdote } from './reducers/anecdoteReducer.js';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Filter from './components/Filter.jsx';

const App = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) => {
      return anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase());
    })
  );
  const dispatch = useDispatch();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  const addAnecdote = (anecdote) => {
    dispatch(createAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={sortedAnecdotes} />
      <AnecdoteForm onSubmit={addAnecdote} vote={vote} />
    </div>
  );
};

export default App;
