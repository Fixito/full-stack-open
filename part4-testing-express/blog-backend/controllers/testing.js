import User from '../models/user.js';
import Blog from '../models/blog.js';

export const reset = async (_req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
};
