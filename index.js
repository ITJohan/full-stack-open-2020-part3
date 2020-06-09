const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-4323234',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-41-34152',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '234-2353457',
    id: 4
  }
]

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} persons \n${new Date()}`
  res.send(info)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'Number missing'
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: `${body.name} already exist in the phonebook`
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const generateId = () => {
  return Math.floor(Math.random() * 10000000000)
}

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))