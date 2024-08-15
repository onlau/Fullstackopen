const mongoose = require('mongoose')

let name
let number

switch(process.argv.length){
case 3:
  break
case 5:
  name = process.argv[3]
  number = process.argv[4]
  break
default:
  console.log('usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://phonebook:${password}@puhelinluettelo.baep1z5.mongodb.net/?retryWrites=true&w=majority&appName=puhelinluettelo`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: String(Math.floor(Math.random() * 10000))
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

else{
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}