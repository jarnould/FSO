import { useState } from 'react'

const Persons = ({persons}) => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)


const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '0678453692', 
    },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (ev) => setNewName(ev.target.value)
  const handleNumberChange = (ev) => setNewNumber(ev.target.value)

  const addPerson = (el) => {
    el.preventDefault()
    if (newName  && newNumber) { 
      persons.findIndex(el => el.name === newName) === -1  ? 
        setPersons(persons.concat({name: newName, number: newNumber})) 
        : alert(`${newName} is already added to phonebook`)
    }
    else alert(`name and phone must be filled in`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <Persons persons={persons} /> 
    </div>
  )
}

export default App
