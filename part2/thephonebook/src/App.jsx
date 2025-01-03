import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Alina" },
    { name: "Serhii" },
  ]);
  const [newName, setNewName] = useState("");

  const addName = (e) => {
    e.preventDefault();
    if (newName) {
      if(persons.find(item=>item.name===newName)){
        alert(`${newName} is already added to phonebook`)
        return
      }
      const newUser = {
        name: newName,
      };
      
      setPersons(persons.concat(newUser));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            value={newName}
            placeholder="fill the text"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((el) => (
        <p key={el.name}>{el.name}</p>
      ))}
    </div>
  );
};

export default App;
