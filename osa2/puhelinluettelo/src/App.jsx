import { useState, useEffect } from 'react'
import Person from './components/Person'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'
import Notification from './components/Notification'
import personService from './services/persons'
import '../index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [searchStr, setSearchStr] = useState('')
  const [currentMessage, setCurrentMessage] = useState(null)
  const [className, setClassName] = useState(null)

  useEffect(() => {
      personService
        .getAll()
        .then(response => {
          setPersons(response)
          setPersonsToShow(response)
          console.log('effect')
        })
      }, [])

  const updateNumber = (newNumber, id) => {
    const person = persons.find(p => p.id === id)
    const newPerson = {...person, number: newNumber}
    if (window.confirm(`${newPerson.name} is already on the list. Update number to ${newPerson.number}?`)){
      personService
      .update(id, newPerson)
      .then(response => {
        console.log('update')
        setPersons(persons.map(person => person.id === id ? response : person))
        setPersonsToShow(persons.map(person => person.id === id ? response : person))
        setClassName('message')
        setCurrentMessage(`Updated number for ${newPerson.name}.`)
        setTimeout(() => {setCurrentMessage(null)},5000)
      })
      .catch(error => {
        setClassName('error')
        setCurrentMessage(JSON.stringify(error.response.data))
        setTimeout(() => {setCurrentMessage(null)},5000)
      })
    }
    else {
      console.log('cancel update')
      return 0
    }
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(newPerson)
    .then(response => {
      console.log('add')
      setPersons(persons.concat(response))
      setPersonsToShow(persons.concat(response))
      setClassName('message')
      setCurrentMessage(`Added ${newPerson.name}.`)
      setTimeout(() => {setCurrentMessage(null)},5000)
    })
    .catch(error => {
      setClassName('error')
      setCurrentMessage(JSON.stringify(error.response.data))
      setTimeout(() => {setCurrentMessage(null)},5000)
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .del(id)
      .then(() => {
        console.log('delete')
        setPersons(persons.filter(person => person.id !== id))
        setPersonsToShow(persons.filter(person => person.id !== id))
        setClassName('message')
        setCurrentMessage(`Deleted ${person.name}.`)
        setTimeout(() => {setCurrentMessage(null)},5000)
      })
    }
    else {
      console.log('cancel delete')
      return 0
    }
  }

  const addOrUpdate = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person === undefined) {
      addPerson({newName, newNumber})
    }
    else {
      updateNumber(newNumber, person.id)
    }
    resetFields()
  }

  const resetFields = () => {
    console.log('reset')
    setNewName('')
    setNewNumber('')
    setSearchStr('')
  }

  const showFiltered = (event) => {
    event.preventDefault()
    setPersonsToShow(persons.filter(person => searchStr==='' ? person : person.name.toLowerCase().includes(searchStr.toLowerCase())))
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchStr(event.target.value)
  }

  return (
    <div>
      <Notification message={currentMessage} className={className}/>
      <h2>Phonebook</h2>
        <SearchForm showFunction={showFiltered} eventHandler={handleSearch} searchTerm={searchStr} setSearchTerm={setSearchStr}/>
      <h2>New person</h2>
        <AddForm adder={addOrUpdate} name={newName} number={newNumber} nameHandler={handleNewName} numberHandler={handleNewNumber}/>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
           <Person key={person.id} person={person} del={() => deletePerson(person.id)}/>)}
      </div>
    </div>
  )
}

export default App