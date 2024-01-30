const NoteForm = ({ addBlog }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    addBlog(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl">Create new</h2>
      {/* title */}
      <label htmlFor="title" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Title:</span>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </label>
      {/* author */}
      <label htmlFor="author" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Author:</span>
        </div>
        <input
          type="text"
          name="author"
          id="author"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </label>
      {/* url */}
      <label htmlFor="url" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">URL:</span>
        </div>
        <input
          type="text"
          name="url"
          id="url"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </label>
      <button className="btn btn-primary mt-4">Create</button>
    </form>
  );
};

export default NoteForm;
