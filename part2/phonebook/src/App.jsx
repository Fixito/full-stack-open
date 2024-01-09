import { useEffect, useState } from 'react';
import PersonList from './PersonList.jsx';
import Form from './Form.jsx';
import Filter from './Filter.jsx';
import personService from './services/persons.js';
import Notification from './Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const notify = ({ text, type }) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const addPerson = ({ newName, newNumber }) => {
    const newPerson = {
      id: Date.now().toString(),
      name: newName,
      number: newNumber
    };
    personService
      .create(newPerson)
      .then(() => {
        setPersons((prevPersons) => {
          return [...prevPersons, newPerson];
        });
        notify({ text: `Added ${newPerson.name}`, type: 'success' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePersonNumber = (person) => {
    personService
      .update(person)
      .then(() => {
        setPersons((prevPersons) => {
          const newPersons = prevPersons.map((p) =>
            p.id === person.id ? { ...p, number: person.number } : p
          );
          return newPersons;
        });
        notify({ text: `Updated ${person.name}`, type: 'success' });
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 404) {
          notify({
            text: `Information of ${person.name} has already been removed`,
            type: 'error'
          });
          setPersons(persons.filter((p) => p.id !== person.id));
        }
      });
  };

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(() => newPersons);
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 404) {
          notify({
            text: `The person has already been removed`,
            type: 'error'
          });
          setPersons(persons.filter((p) => p.id !== id));
        }
      });
  };

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <h1>Phonebook</h1>
      <Notification {...message} />
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        addPerson={addPerson}
        persons={persons}
        updatePersonNumber={updatePersonNumber}
      />
      <PersonList persons={filteredPeople} removePerson={removePerson} />
    </main>
  );
};

export default App;
