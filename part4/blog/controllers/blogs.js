import Blog from '../models/blog.js';

export const getAllBlogs = async (_request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
};

export const createBlog = async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Please provide title and url' });
  }

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
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
  });
  response.status(200).json(updatedBlog);
};

export const deleteBlog = async (request, response) => {
  const { id } = request.params;

  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    return response.status(404).json({ error: `No blog with id ${id}` });
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
};
