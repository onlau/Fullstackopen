const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('request-body', (request, response) => {
    if (request.method === 'POST'){
        return JSON.stringify(request.body)
    }
})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

let persons = [{
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
},
{
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
},
{
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
},
{
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
}]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person){
        return response.json(person)
    }
    return response.status(404).end()
})

app.get('/info', (request, response) => {
    const date = new Date()
    const length = Object.entries(persons).length
    response.send(`
        <div>
            Phonebook has info for ${length} people
        </div>
        <div>
            ${date}
        </div>`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name){
        return response.status(400).send("name missing")
    }

    if (!body.number){
        return response.status(400).send("number missing")
    }

    const name = persons.filter(person => person.name === body.name)

    if (name.length!==0){
        return response.status(400).send("name must be unique")
    }

    const id = String(Math.floor(Math.random() * 10000))

    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})