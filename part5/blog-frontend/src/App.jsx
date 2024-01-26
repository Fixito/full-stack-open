import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';
import LoginForm from './components/LoginForm.jsx';
import BlogForm from './components/BlogForm.jsx';
import Notification from './components/Notification.jsx';
import Togglable from './components/Togglable.jsx';
import {
  useNotifcationDispatch,
  useNotificationValue,
} from './components/NotificationContext.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  const notification = useNotificationValue();
  const notificationDispatch = useNotifcationDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'));

    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userInputs) => {
    try {
      const user = await loginService.login(userInputs);
      setUser(user);
      blogService.setToken(user.token);
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    } catch (error) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'danger',
          text: error.response.data.error,
        },
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedBlogAppUser');
  };

  const addBlog = async (blogInputs) => {
    try {
      const addedBlog = await blogService.create(blogInputs);
      setBlogs([...blogs, addedBlog]);
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'success',
          text: `A new blog "${addedBlog.title}" added`,
        },
      });
    } catch (error) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'danger', text: error.response.data.error },
      });
    }
  };

  return (
    <main>
      <h1>Blogs</h1>
      {notification && <Notification />}
      {!user && <LoginForm login={handleLogin} />}
      {user && (
        <div className='flow'>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel='Create new blog'>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <section className='bloglist'>
            {sortedBlogs.map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  setBlogs={setBlogs}
                  user={user}
                />
              );
            })}
          </section>
        </div>
      )}
    </main>
  );
};

export default App;
