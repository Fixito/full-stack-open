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

const create = async (newBlog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await axios.post(baseUrl, newBlog, config);
  return data;
};

const update = async (blogId, updatedblog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await axios.put(`${baseUrl}/${blogId}`, updatedblog, config);
  return data;
};

const remove = async (blogId) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await axios.delete(`${baseUrl}/${blogId}`, config);
  return data;
};

export default { getAll, create, update, remove, setToken };
