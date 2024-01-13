import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({notification}) => {
  if (notification.type === null) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

const Filter = ({onChange}) => 
  <div>
    filter shown with: <input name="filter" onChange={onChange}/>
  </div> 

const PersonForm = ({onSubmit, onNameChange, onNumberChange}) =>  
  <form onSubmit={onSubmit}>
    <div>
      name: <input name="name" onChange={onNameChange}/>
    </div>
    <div>
      number: <input name="number" onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({persons, filter, deletePerson}) => {
  const personsFiltered = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase())!==-1)
  return (
    personsFiltered.map(person => 
      <Person key={person.id} person={person} deletePerson={deletePerson}/>
    )
  )
}  

const Person = ({person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number} {''}
      <button  onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({type: null}) 

  useEffect(() => {
    personService
      .getPersons()
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (ev) => setNewName(ev.target.value)
  const handleNumberChange = (ev) => setNewNumber(ev.target.value)
  const handleFilterChange = (ev) => setFilter((ev.target.value))
   
  const addPerson = (el) => {
    el.preventDefault()
    if (newName  && newNumber) {
      const pers=persons.find(el => el.name === newName)   
      
      if (pers === undefined) 
        personService
        .createPerson({name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification({type: 'info', message:`${newName} added`})
          setTimeout(() => setNotification({type: null}), 5000)
        })
      
      else if(confirm(`${pers.name} is already added to phonebook, replace the old number with a new one ?`))
        personService
          .updatePerson(pers.id, {...pers, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setNotification({type: 'info', message:`${pers.name} updated`})
            setTimeout(() => setNotification({type: null}), 5000) 
          })
          .catch(error => {
            setNotification({type: 'error', message:`${pers.name} has already been removed from the server`})
            setPersons(persons.filter(person => person.id !== pers.id))
            setTimeout(() => setNotification({type: null}), 5000)
          })  
    }

    else alert(`name and phone must be filled in`)
  } 

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name} ?`)) 
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id )))
        .catch(error => console.log(`${name} has already been removed from the server`))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} /> 
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} /> 
    </div>
  )
}

export default App
