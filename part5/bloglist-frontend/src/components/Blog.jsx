import { useState } from 'react';
import blogService from '../services/blogs.js';

const Blog = ({ blog, notify, setBlogs }) => {
  const { id, title, author, url, likes, user } = blog;
  const [isShown, setIsShown] = useState(true);

  const removeBlog = async () => {
    const isBlogDeleted = confirm(`Remove blog ${title} by ${author}?`);

    if (isBlogDeleted) {
      try {
        await blogService.remove(id);
        setBlogs((blogs) => {
          return blogs.filter((blog) => blog.id !== id);
        });
        notify({
          type: 'success',
          text: `Blog "${title}" deleted`,
        });
      } catch (error) {
        notify({ type: 'danger', text: error.response.data.error });
      }
    }
  };

  const toggleLike = async () => {
    const nextBlog = { id, title, author, url, likes: likes + 1 };

    try {
      const updatedBlog = await blogService.update(id, nextBlog);
      setBlogs((blogs) => {
        return blogs.map((blog) => (blog.id === id ? updatedBlog : blog));
      });
    } catch (error) {
      notify({ type: 'danger', text: error.response.data.error });
    }
  };

  return (
    <article className='flow blog'>
      <div>
        {title} - <span>{author}</span>{' '}
        <button onClick={() => setIsShown(!isShown)}>
          {isShown ? 'Hide' : 'View'}
        </button>
      </div>
      {isShown ? (
        <>
          <p>{url}</p>
          <p>
            {likes} like{likes > 1 ? 's' : ''}{' '}
            <button onClick={toggleLike}>Like</button>
          </p>
          <p>{user.name}</p>
        </>
      ) : null}
      <button className='delete-btn' onClick={removeBlog}>
        Remove
      </button>
    </article>
  );
};

export default Blog;
