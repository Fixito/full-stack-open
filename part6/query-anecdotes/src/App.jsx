import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, postAnecdote, voteAnecdote } from './request.js';
import { useNotificationDispatch } from './NotificationContext.jsx';

const App = () => {
  const queryclient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: ({ response }) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: response.data.error });
    },
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate(content);
    dispatch({ type: 'SET_NOTIFICATION', payload: 'anecdote added' });
  };

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `yanecdote '${anecdote.content}' voted`,
    });
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
