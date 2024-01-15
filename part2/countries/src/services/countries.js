import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => axios.get(baseUrl)

export default {getCountries}