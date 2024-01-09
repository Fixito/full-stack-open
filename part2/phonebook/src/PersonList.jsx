import Person from './Person.jsx';

const PersonList = ({ persons, removePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return (
            <Person key={person.id} {...person} removePerson={removePerson} />
          );
        })}
      </div>
    </>
  );
};

export default PersonList;
