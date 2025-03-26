const mongoose = require('mongoose')

if (process.argv.length < 3) {
   console.log('give password as argument')
   process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Serhii:${password}@cluster0.crciu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
   name: String,
   number: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
   name: process.argv[3],
   number: process.argv[4],
})

if (process.argv.length > 3){
   note.save().then(result => {
      console.log(`added ${note.name} number ${note.number} to phonebook`)
      mongoose.connection.close()
   })
}else{
   Note.find({}).then(result => {
      result.forEach(note => console.log(`phonebook ${note.name} ${note.number}`))
      mongoose.connection.close()
   })
}