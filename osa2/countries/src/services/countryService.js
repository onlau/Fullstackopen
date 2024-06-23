import axios from 'axios'

const apiKey = import.meta.env.VITE_APIKEY      //Variable VITE_APIKEY from .env file in project root directory

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const weatherUrl = 'https://api.openweathermap.org/data/2.5/'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const getId = location => {
    const request = axios.get(`${weatherUrl}/find?q=${location}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}

const getWeather = id => {
    const request = axios.get(`${weatherUrl}forecast?id=${id}&appid=${apiKey}`)
    return request.then(response => response.data.list)
}

export default { getAll, getId, getWeather }