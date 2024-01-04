import { useState } from 'react'

const Persons = ({persons}) => persons.map(person => <p key={person.name}>{person.name}</p>)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNamechange = (e) => setNewName(e.target.value)
  

  const addPerson = (e) => {
    e.preventDefault()
    setPersons(persons.concat({name: newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNamechange}/>
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
