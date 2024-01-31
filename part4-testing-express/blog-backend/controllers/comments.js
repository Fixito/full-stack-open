import Comment from '../models/comment.js';
import Blog from '../models/blog.js';

export const createComment = async (request, response) => {
  const { id: blogId } = request.params;
  const { text } = request.body;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).json({ error: `No blog with id ${id}` });
  }

  const comment = new Comment({
    text,
  });

  const savedComment = await comment.save();
  comment.blog = blog._id;
  blog.comments = blog.comments.concat(savedComment._id);
  await comment.save();
  await blog.save();

  response.status(201).json(comment);
};

export const getSingleBlogComments = async (request, response) => {
  const { id: blogId } = request.params;
  const comments = await Comment.find({ blog: blogId });

  response.status(200).json(comments);
};
