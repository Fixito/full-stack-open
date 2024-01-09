const Person = ({ id, name, number, removePerson }) => {
  const handleDelete = () => {
    const isDeleted = window.confirm(`Delete ${name} ?`);

    if (isDeleted) {
      removePerson(id);
    }
  };

  return (
    <p>
      {name} {number} <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

export default Person;
