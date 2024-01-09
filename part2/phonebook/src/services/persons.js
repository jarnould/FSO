import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl)

const createPerson = (newPerson) => axios.post(baseUrl, newPerson)

export default {getPersons, createPerson}