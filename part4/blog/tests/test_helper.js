import Blog from '../models/blog.js';

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
  const note = new Blog({ title: 'non existing id' });
  await note.save();
  await note.remove();

  return note._id.toString();
};
