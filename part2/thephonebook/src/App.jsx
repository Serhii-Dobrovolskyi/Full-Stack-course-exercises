import { useState } from "react";

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

const PersonForm = ({ addName,newName,setNewName,newNumber,setNewNumber }) => {
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

const Persons = ({showPersons})=>{
  return(
    showPersons.map((el) => (
      <p key={el.id}>
        {el.name} {el.number}
      </p>
    ))
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterPersons, setFilterPersons] = useState("");

  const addName = (e) => {
    e.preventDefault();
    if (newName) {
      if (persons.find((item) => item.name === newName)) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      const newUser = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

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
      <Persons showPersons={showPersons}/>
    </div>
  );
};

export default App;
