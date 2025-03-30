const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://Serhii:${password}@cluster0.crciu.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
   name: String,
   number: String,
})
const Person = mongoose.model('Person', personSchema)
personSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
   }
})

let persons = [
   {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
   },
   {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
   },
   {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
   },
   {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
   }


]
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app

app.get('/api/persons', (request, response) => {
   Person.find({}).then(persons => {
      response.json(persons)
   })
})

app.get('/info', (request, response) => {
   if (persons) {
      const date = new Date().toString()
      response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
   } else {
      response.status(404).end()
   }
})

app.get('/api/persons/:id', (request, response) => {
   const id = request.params.id
   const person = persons.find(person => person.id === id)
   if (person) {
      response.json(person)
   } else {
      response.status(404).end('Is not found')
   }
})

app.delete('/api/persons/:id', (request, response) => {
   const id = request.params.id
   persons = persons.filter(person => person.id === id)
   response.status(204).end('No content')
})

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (request, response) => {
   const body = request.body
   if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name must be unique' })
   }
   const person = {
      id: Math.random() * 100,
      name: body.name,
      number: body.number,
   }
   persons.concat(person)
   response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
