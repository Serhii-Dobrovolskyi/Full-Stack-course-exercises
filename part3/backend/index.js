const express = require('express')
const app = express()

app.use(express.json())

let notes = [
   {
      id: "1",
      content: "HTML is easy",
      important: true
   },
   {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
   },
   {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
   },
   {
      id: "4",
      content: "Browser can execute only JavaScript",
      important: false
   },
   {
      id: "5",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
   }

]

// app.get('/',(request,response)=>{
//    response.send('<h1>Hello World!</h1>')
// })
const generateId = () => {
   const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
   return String(maxId + 1)
}
app.get('/api/notes', (request, response) => {
   response.json(notes)
})

app.post('/api/notes', (request, response) => {
   const body = request.body
   if (!body.content) {
      return response.status(400).json({ error: "content missing" })
   }
   const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId()
   }
   notes = notes.concat(note)
   response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
   const id = request.params.id
   const note = notes.find(note => note.id === id)

   if (note) {
      response.json(note)
   } else {
      response.status(404).end('<h1>yps.. we have a problem!</h1>')
   }
})

const PORT = 3002
app.listen(PORT)
console.log(`Server running on porrt ${PORT}`)
