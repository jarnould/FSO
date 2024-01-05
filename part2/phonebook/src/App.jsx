import { useState } from 'react'

const Persons = ({persons}) => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState(persons)

  const handleNameChange = (ev) => setNewName(ev.target.value)
  const handleNumberChange = (ev) => setNewNumber(ev.target.value)
  const handleFilterChange = (ev) => setShowPersons(
    persons.filter(
       person => person.name.toLowerCase().indexOf(ev.target.value.toLowerCase())!==-1
    )
  )

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
      <div>
        filter shown with: <input onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
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
      <Persons persons={showPersons} /> 
    </div>
  )
}

export default App
