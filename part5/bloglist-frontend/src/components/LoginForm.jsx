const LoginForm = ({ login }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    login(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to application</h2>
      <div>
        <label htmlFor='username'>Username</label>{' '}
        <input
          type='text'
          name='username'
          id='username'
          defaultValue='Superuser'
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>{' '}
        <input
          type='text'
          name='password'
          id='password'
          defaultValue='secret123'
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
