import { useState, useEffect } from 'react'
import countriesService from './services/countries.js'
import weatherService from './services/weather.js'

const Search = ({onChange}) => 
  <div>
    <label>
      find countries: <input name="search" onChange={onChange}/>
    </label>
  </div> 

const Countries = ({countries, onClickShow}) => 
  countries.length === 0 
    ? null
    : countries.length > 10 
      ? <p>Too many matches</p>
      : countries.length > 1 
        ? countries.map(country => <Country key={country.cca2} country={country} onClickShow={onClickShow} />)
        : <CountryData country={countries[0]} />


const Country = ({country, onClickShow}) =>  
  <p>{country.name.common}
    <button onClick={()=> onClickShow([country])}>Show</button>
  </p> 
 
const CountryData = ({country}) => { 
  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.keys(country.languages).map(key => <li key={key}> {country.languages[key]} </li> )}
    </ul>
    <img src={country.flags.png} />
    <Weather country={country}/>
  </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState({})
  
  useEffect(() => {
    weatherService.getWeather(country.latlng)
    .then(response => setWeather(response.data))
  }, [])

  if (Object.keys(weather).length===0) return null

  return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p> temperature : {weather.current.temperature_2m} Celsius</p>
        <p> wind: {weather.current.wind_speed_10m} km/h</p>
        <p> precipitation: {weather.current.precipitation} millimeters</p>
      </div>
  )
}

const App = () => {
  const [countries, setCountries]=useState([])
  const [countriesFiltered, setCountriesFiltered]=useState([])
  
  const updateCountriesFiltered = (ev) => setCountriesFiltered(countries.filter(countrie =>
        countrie.name.common.toLowerCase().indexOf(ev.target.value.toLowerCase())!==-1))

  useEffect(() => {
    countriesService.getCountries()
      .then(response => {
        setCountries(response.data)
        setCountriesFiltered(response.data)
      })
      .catch(error => console.log(`getCountries error : ${error}`))
  }, [])

  return (
    <>
        <Search onChange={updateCountriesFiltered} />
        <Countries countries={countriesFiltered} onClickShow={setCountriesFiltered}/>
    </>
  )
}

export default App
