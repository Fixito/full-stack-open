import axios from 'axios';
const baseUrl = '/api/blogs';

export const getBlogComments = async (blogId) => {
  const { data } = await axios.get(`${baseUrl}/${blogId}/comments`);
  return data;
};

export const createComment = async ({ blogId, text }) => {
  const { data } = await axios.post(`${baseUrl}/${blogId}/comments`, { text });
  return data;
};
