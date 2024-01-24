import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const create = async (content) => {
  const object = { content, votes: 0 };
  const { data } = await axios.post(baseUrl, object);
  return data;
};

export const update = async (anecdote) => {
  const nextAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, nextAnecdote);
  return data;
};
