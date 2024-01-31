import Blog from '../models/blog.js';
import User from '../models/user.js';

export const initialBlogs = [
  {
    title: 'First post',
    author: 'John Doe',
    url: 'first-post',
    likes: 0,
  },
  {
    title: 'Second post',
    author: 'John Doe',
    url: 'second-post',
    likes: 1,
  },
];

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

export const nonExistingId = async () => {
  const blog = new Blog({ title: 'non existing id' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
