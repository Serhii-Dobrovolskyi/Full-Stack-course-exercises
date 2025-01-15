import { useState, useEffect } from "react";
import personsServise from "./services/persons";

const Filter = ({ filterPersons, setFilterPersons }) => {
  return (
    <div>
      filter shown with
      <input
        value={filterPersons}
        onChange={(e) => setFilterPersons(e.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input
          value={newName}
          placeholder="fill the text"
          onChange={(e) => setNewName(e.target.value)}
        />
        <div>
          number:{" "}
          <input
            value={newNumber}
            placeholder="fill the number"
            onChange={(e) => setNewNumber(e.target.value)}
            type="number"
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ showPersons, deletePerson }) => {
  return showPersons.map((el) => (
    <p key={el.id}>
      {el.name} {el.number}
      <button onClick={() => deletePerson(el.name, el.id)}>delete</button>
    </p>
  ));
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterPersons, setFilterPersons] = useState("");

  useEffect(() => {
    personsServise
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);
  const addName = (e) => {
    e.preventDefault();
    if (newName) {
      const newUser = {
        name: newName,
        number: newNumber,
      };
      if (persons.find((el) => el.name === newName)) {
        const originalObject = persons.find((el) => el.name === newName);
        updatePerson(originalObject.id, newUser);
        return;
      }
      personsServise.createPerson(newUser).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };
  const updatePerson = (id, newUser) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personsServise.updatePerson(id, newUser).then((updatedPerson) => {
        setPersons(
          persons.map((elem) =>
            elem.id === updatedPerson.id ? updatedPerson : elem
          )
        );
      });
    }
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personsServise.deletePerson(id).then((deletedPerson) => {
        setPersons(persons.filter((el) => el.id !== deletedPerson.id));
      });
    }
    return;
  };
  const showPersons = !filterPersons
    ? persons
    : persons.filter((el) =>
        el.name.toLowerCase().includes(filterPersons.toLowerCase())
      );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterPersons={filterPersons}
        setFilterPersons={setFilterPersons}
      />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
