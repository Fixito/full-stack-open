import Blog from '../models/blog.js';
import User from '../models/user.js';

export const getAllBlogs = async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
};

export const createBlog = async (request, response) => {
  const { author, title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Please provide title and url' });
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({ author, title, url, user: user.id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
};

export const updateBlog = async (request, response) => {
  const { id } = request.params;

  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    return response.status(404).json({ error: `No blog with id ${id}` });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  }).populate('user');
  response.status(200).json(updatedBlog);
};

export const deleteBlog = async (request, response) => {
  const { id } = request.params;

  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    return response.status(404).json({ error: `No blog with id ${id}` });
  }

  if (existingBlog.user._id.toString() !== request.user.id.toString()) {
    return response.status(404).json({ error: `Permission denied` });
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
};
