import { useState, useEffect } from "react";
import axios from "axios";

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

const Persons = ({ showPersons }) => {
  return showPersons.map((el) => (
    <p key={el.id}>
      {el.name} {el.number}
    </p>
  ));
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterPersons, setFilterPersons] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  const addName = (e) => {
    e.preventDefault();
    if (newName) {
      if (persons.find((el) => el.name === newName)) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      const newUser = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      axios.post("http://localhost:3001/persons", newUser).then(resp=>console.log(resp))
      setPersons(persons.concat(newUser));
      setNewName("");
      setNewNumber("");
    }
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
      <Persons showPersons={showPersons} />
    </div>
  );
};

export default App;
