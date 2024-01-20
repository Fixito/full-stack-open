import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';
import LoginForm from './components/LoginForm.jsx';
import NoteForm from './components/NoteForm.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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

  const notify = ({ text, type }) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const handleLogin = async (userInputs) => {
    try {
      const user = await loginService.login(userInputs);
      setUser(user);
      blogService.setToken(user.token);
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      notify({ type: 'success', text: 'Logged in' });
    } catch (error) {
      notify({ type: 'danger', text: error.response.data.error });
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
      notify({
        type: 'success',
        text: `A new blog "${addedBlog.title}" added`,
      });
    } catch (error) {
      notify({ type: 'danger', text: error.response.data.error });
    }
  };

  return (
    <main>
      <h1>Blogs</h1>

      {message && <Notification {...message} />}
      {!user && <LoginForm login={handleLogin} />}
      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <NoteForm addBlog={addBlog} />
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default App;
