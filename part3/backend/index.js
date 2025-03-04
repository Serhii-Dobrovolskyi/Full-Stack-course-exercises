const express = require('express')
const morgan = require('morgan')

const app = express()

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

app.use(express.json())
app.use(morgan('tiny'))
app

app.get('/api/persons', (request, response) => {
   if (persons) {
      response.json(persons)
   } else {
      response.status(404).end()
   }
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

const PORT = 3001
app.listen(PORT)
