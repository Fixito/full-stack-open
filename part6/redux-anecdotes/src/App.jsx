import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote, voteForAnecdote } from './reducers/anecdoteReducer.js';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';

const App = () => {
  const anecdotes = useSelector((state) => state);
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
      <AnecdoteList anecdotes={sortedAnecdotes} />
      <AnecdoteForm onSubmit={addAnecdote} vote={vote} />
    </div>
  );
};

export default App;
