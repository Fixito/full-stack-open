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
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>Title: </label>
        <input type='text' name='title' id='title' />
      </div>
      <div>
        <label htmlFor='author'>Author: </label>
        <input type='text' name='author' id='author' />
      </div>
      <div>
        <label htmlFor='url'>URL: </label>
        <input type='text' name='url' id='url' />
      </div>
      <button>Create</button>
    </form>
  );
};

export default NoteForm;
