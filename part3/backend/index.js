require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')
const person = require('./models/person')
// const moggoUrl = process.env.MONGODB_URI
// const password = process.argv[2]
// const url = `mongodb+srv://Serhii:${password}@cluster0.crciu.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`



// const personSchema = new mongoose.Schema({
//    name: String,
//    number: String,
// })
// const Person = mongoose.model('Person', personSchema)
// personSchema.set('toJSON', {
//    transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//    }
// })

// let persons = [
//    {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//    },
//    {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//    },
//    {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//    },


// ]

const errorHandler = (error, request, response, next) => {
   console.error(error.message)

   if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
   }

   next(error)
}

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
   Person.find({}).then(persons => {
      if (persons) {
         const date = new Date().toString()
         response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
      } else {
         response.status(404).end()
      }
   })

})

app.get('/api/persons/:id', (request, response) => {
   // const id = request.params.id
   // const person = persons.find(person => person.id === id)
   // if (person) {
   //    response.json(person)
   // } else {
   //    response.status(404).end('Is not found')
   // }
   Person.findById(request.params.id).then(person => {
      response.json(person)
   })
})

app.delete('/api/persons/:id', (request, response, next) => {
   // const id = request.params.id
   // persons = persons.filter(person => person.id === id)
   // response.status(204).end('No content')
   Person.findByIdAndDelete(request.params.id)
      .then(result => response.status(204).end())
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
   const { name, number } = request.body
   Person.findById(request.params.id)
      .then(person => {
         if (!person) {
            return response.status(404).end()
         }
         person.name = name
         person.number = number
         return person.save().then((updatedPerson) => {
            response.json(updatedPerson)
         })
      })
      .catch(error => next(error))
})

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (request, response) => {
   const body = request.body
   if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name must be unique' })
   }
   const person = new Person({
      name: body.name,
      number: body.number,
   })
   // persons.concat(person)
   // response.json(person)
   person.save().then(savedPerson => {
      response.json(savedPerson)
   })
})

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}
console.log(Person)
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
