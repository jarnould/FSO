import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import persons from './services/persons'

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

const Persons = ({persons, filter, onClickDelete}) => {
  const personsFiltered = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase())!==-1)
  return (
    personsFiltered.map(person => 
      <Person key={person.id} person={person} onClickDelete={onClickDelete}/>
    )
  )
}  

const Person = ({person, onClickDelete }) => {
  return (
    <p>
      {person.name} {person.number} {''}
      <button  onClick={() => onClickDelete(person.id, person.name)}>delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getPersons()
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (ev) => setNewName(ev.target.value)
  const handleNumberChange = (ev) => setNewNumber(ev.target.value)
  const handleFilterChange = (ev) => setFilter((ev.target.value))
  const handleClickDelete = (id, name) => {
    if (confirm(`Delete ${name} ?`)) 
      personService
        .deletePerson(id)
        .then (
          setPersons(
            persons.filter((person)=> person.id !== id )
          )
        )
  }
     
  
  
  const addPerson = (el) => {
    el.preventDefault()
    if (newName  && newNumber) { 
      persons.findIndex(el => el.name === newName) === -1  ?
        personService
        .createPerson({name: newName, number: newNumber})
        .then(response => setPersons(persons.concat(response.data)))
         
  //      setPersons(persons.concat({name: newName, number: newNumber}))
        : alert(`${newName} is already added to phonebook`)
    }
    else alert(`name and phone must be filled in`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} /> 
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onClickDelete={handleClickDelete} /> 
    </div>
  )
}

export default App
