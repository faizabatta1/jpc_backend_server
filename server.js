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

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

const cookieParser = require('cookie-parser');
app.use(cookieParser())

const userRouter = require('./routes/user/userRouter')
app.use('/api',userRouter)

const userFront = require('./routes/user/userFront')
const settingsFront = require('./routes/settings/settingsFront')
app.use(userFront,settingsFront)

app.get('/', async (req,res) =>{
    return res.status(200).render('index')
})

app.route('*', (req, res) => res.send('unknown route'))
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}/`))