import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const postAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const { data } = await axios.post(baseUrl, newAnecdote);
  return data;
};

export const voteAnecdote = async (anecdote) => {
  const { id, votes } = anecdote;
  const nextAnecdote = { ...anecdote, votes: votes + 1 };
  const { data } = await axios.put(`${baseUrl}/${id}`, nextAnecdote);
  return data;
};
