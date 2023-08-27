require('dotenv').config()
require('./utils/mongooseConnection')

const express = require('express')
const app = express()
const port = 8080

const cors = require('cors')
app.use(cors({ origin: '*' }))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const usersRouter = require('./routes/usersRouter')
app.use('/api',usersRouter)

app.route('*', (req, res) => res.send('unknown route'))
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}/`))