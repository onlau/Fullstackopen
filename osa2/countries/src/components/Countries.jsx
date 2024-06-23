import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

const Countries = ({countriesToShow, handleButton}) => {

    const [weather, setWeather] = useState([])
    const [request, setRequest] = useState(true)

    useEffect(() => {
        if (countriesToShow.length === 1 & request) {
            countryService
            .getId(countriesToShow[0].capital[0])
            .then(response => {countryService
                .getWeather(response.list[0].id)
                .then(response => {
                    setWeather(
                    [(response[0].main.temp-273.4).toFixed(2),
                     `https://openweathermap.org/img/wn/${response[0].weather[0].icon}@2x.png`,
                     response[0].wind.speed])})})
 
            setRequest(false)}
        else {
            () => {}
        }})

    if (countriesToShow.length > 10){
        return (<div>Too many matches</div>)
    }

    else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        if (request===false){
            setRequest(true)
        }
        return countriesToShow.map(country => <li key={country.name.common}>{country.name.common}<button onClick={() => handleButton(country.name.common)}>show</button></li>)
    }

    else if (countriesToShow.length === 0){
        return (<div>No matches found</div>)
    }

    return countriesToShow.map(country => 
            <div key={country.name.common}> 
                <p><strong>{country.name.common}</strong><br/>
                capital {country.capital}<br/>
                area {country.area}</p>
                <h4>languages:</h4>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                <img src={country.flags.png}></img>
                <h3>Weather in {country.capital[0]}</h3>
                <p>temperature {weather[0]} Celsius <br/>
                    <img src={weather[1]}></img><br/>
                    wind {weather[2]}m/s</p>
            </div>
    )
}


export default Countries