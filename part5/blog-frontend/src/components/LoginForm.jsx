const LoginForm = ({ login }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    login(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
      <h2 className="text-2xl">Log in to application</h2>
      <label htmlFor="username" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <input
          type="text"
          name="username"
          id="username"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </label>
      <label htmlFor="password" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </label>
      <button className="btn btn-primary mt-4">Login</button>
    </form>
  );
};

export default LoginForm;
