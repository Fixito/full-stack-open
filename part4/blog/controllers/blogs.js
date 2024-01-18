import Blog from '../models/blog.js';

export const getAllBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

export const createBlog = (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};
