const AnecdoteForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const anecdote = formData.get('anecdote');
    onSubmit(anecdote);
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
