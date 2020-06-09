const express = require('express')
const app = express()

const persons = [
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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))