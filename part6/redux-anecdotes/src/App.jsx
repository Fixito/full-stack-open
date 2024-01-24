import { useSelector, useDispatch } from 'react-redux';
import {
  createAnecdote,
  initializeAnecdotes,
  updateAnecdote,
} from './features/anecdoteSlice.js';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Filter from './components/Filter.jsx';
import Notification from './components/Notification.jsx';
import { setNotification } from './features/notificationSlice.js';
import { useEffect } from 'react';

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

  const vote = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`));
    dispatch(updateAnecdote(anecdote));
  };

  const addAnecdote = async (anecdote) => {
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`anecdote added`));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={sortedAnecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
