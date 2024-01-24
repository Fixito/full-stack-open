import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote, voteForAnecdote } from './features/anecdoteSlice.js';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Filter from './components/Filter.jsx';
import Notification from './components/Notification.jsx';
import { setNotification } from './features/notificationSlice.js';

const App = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase());
    });
  });
  const dispatch = useDispatch();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const vote = ({ id, content }) => {
    dispatch(setNotification(`you voted '${content}'`));
    dispatch(voteForAnecdote(id));
  };

  const addAnecdote = (anecdote) => {
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`anecdote added`));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={sortedAnecdotes} vote={vote} />
      <AnecdoteForm onSubmit={addAnecdote} />
    </div>
  );
};

export default App;
