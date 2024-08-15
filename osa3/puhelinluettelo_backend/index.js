require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'bad id' })
  } else if (error.name === 'ValidationError') {
    console.log(error.message)
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

morgan.token('request-body', (request, response) => {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(person => {
      const count = Object.entries(person).length
      response.send(`
        <div>
            Phonebook has info for ${count} people
        </div>
        <div>
            ${new Date()}
        </div>`)})
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name){
    return response.status(400).send('name missing')
  }

  if (!body.number){
    return response.status(400).send('number missing')
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true, runValidators:true, context:'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})