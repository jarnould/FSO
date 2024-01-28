import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => axios.get(baseUrl)
const createPerson = (newPerson) => axios.post(baseUrl, newPerson)
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)
const updatePerson = (id, newPerson) => axios.put(`${baseUrl}/${id}`,newPerson)

export default {getPersons, createPerson, deletePerson, updatePerson}
