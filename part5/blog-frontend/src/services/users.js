import axios from 'axios';
const baseUrl = '/api/users';

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
