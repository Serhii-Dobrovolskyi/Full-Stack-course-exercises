const mongoose = require('mongoose')

if (process.argv.length < 3) {
   console.log('give password as argument')
   process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Serhii:${password}@cluster0.crciu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
   name: String,
   number: String,
})

const Person = mongoose.model('Note', personSchema)

const person = new Person({
   name: process.argv[3],
   number: process.argv[4],
})

if (process.argv.length > 3) {
   person.save().then(result => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
   })
} else {
   Person.find({}).then(result => {
      result.forEach(person => console.log(`phonebook ${person.name} ${person.number}`))
      mongoose.connection.close()
   })
}