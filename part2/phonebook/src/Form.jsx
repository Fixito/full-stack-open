import { useState } from 'react';

const Form = ({ persons, addPerson, updatePersonNumber }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert('Please provide a unique name and a phone number');
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const isNumberReplaced = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (isNumberReplaced) {
        updatePersonNumber({ ...existingPerson, number: newNumber });
      }
    } else {
      addPerson({ newName, newNumber });
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new</h2>
      {/* Name */}
      <div>
        <label htmlFor='name'>
          Name:{' '}
          <input
            type='text'
            name='name'
            id='name'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
      </div>
      {/* Number */}
      <div>
        <label htmlFor='phone'>
          Number:{' '}
          <input
            type='tel'
            name='phone'
            id='phone'
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </label>
      </div>

      <button type='submit'>Add</button>
    </form>
  );
};

export default Form;
