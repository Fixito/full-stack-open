import { useState } from 'react';
import blogService from '../services/blogs.js';
import { useNotifcationDispatch } from './NotificationContext.jsx';

const Blog = ({ blog, setBlogs, user }) => {
  const { id, title, author, url, likes, user: owner } = blog;
  const [isShown, setIsShown] = useState(false);
  const notificationDispatch = useNotifcationDispatch();

  const removeBlog = async () => {
    const isBlogDeleted = confirm(`Remove blog ${title} by ${author}?`);

    if (isBlogDeleted) {
      try {
        await blogService.remove(id);
        setBlogs((blogs) => {
          return blogs.filter((blog) => blog.id !== id);
        });
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'success',
            text: `Blog "${title}" deleted`,
          },
        });
      } catch (error) {
        console.log(error);
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'danger',
            text: error.response.data.error,
          },
        });
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
    <article className='flow blog' data-testid='blog'>
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
          <p>{owner.name}</p>
        </>
      ) : null}
      {(user.id === owner.id || user.id === owner) && (
        <button className='delete-btn' onClick={removeBlog}>
          Remove
        </button>
      )}
    </article>
  );
};

export default Blog;
