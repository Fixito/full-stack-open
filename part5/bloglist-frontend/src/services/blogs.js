import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (newObject) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await axios.post(baseUrl, newObject, config);
  return data;
};

export default { getAll, create, setToken };
