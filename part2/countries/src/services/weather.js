import axios from 'axios'

const baseUrl='https://api.open-meteo.com/v1/forecast?'

const getWeather = ([latitude, longitude]) => {
    let url = `${baseUrl}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m`
    return axios.get(url)
}

export default {getWeather}