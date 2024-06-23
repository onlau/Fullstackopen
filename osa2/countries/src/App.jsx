import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'
import countryService from './services/countryService'


function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => {
      setCountries(response)
    })
  },[])

  const show = (name) => {
    setCountriesToShow(countries.filter(country => country.name.common === name))
  }

  const search = (event) => {
    setSearchTerm(event.target.value)
    setCountriesToShow(countries.filter(country => event.target.value==='' ? country : country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <SearchForm eventHandler={search} searchTerm={searchTerm}/> 
      <Countries countriesToShow={countriesToShow} handleButton={show}/>
    </div>
    
  )
}

export default App