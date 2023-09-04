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

app.get('/login', (req,res) =>{
    return res.status(200).render('auth/login')
})

app.get('/api/logout',(req,res) =>{

    res.cookie('isLogged',{
        expires: Date.now()
    })

    return res.redirect('/')
})


app.post('/api/login', async (req,res) =>{
    const { username, password } = req.body

    if(username == 'admin' && password == 'admin'){
        res.cookie('isLogged','true',{
            maxAge: 36000000000000, // Cookie expiration time in milliseconds (1 hour in this case)
            httpOnly: true,
        })

        res.redirect('/')
    }else{
        return res.status(500).json({ message: "Error Message"})
    }
})
app.use((req,res,next) =>{
    if(
        req.url.includes('/api/')
        || req.url.includes('/images/')
        || req.url.includes('/profiles/')
        || req.url.includes('/css/')
    ){
        return next()
    }else{
        if(req.cookies.isLogged == "true" && (req.url != "/login" ) ){
            next();
        }else{
            return res.redirect('/login')
        }
    }

})

const userRouter = require('./routes/user/userRouter')
const categoryRouter = require('./routes/category/categoryRouter')
const settingsRouter = require('./routes/settings/settingsRouter')
const productsRouter = require('./routes/products/productsRoute')
app.use('/api',userRouter,categoryRouter,settingsRouter,productsRouter)

const userFront = require('./routes/user/userFront')
const settingsFront = require('./routes/settings/settingsFront')
const categoryFront = require('./routes/category/categoryFront')
const providerFront = require('./routes/provider/providerFront')
const productsFront = require('./routes/products/productsFront')
app.use(userFront,settingsFront,categoryFront,providerFront,productsFront)

app.get('/', async (req,res) =>{
    return res.status(200).render('index')
})

app.route('*', (req, res) => res.send('unknown route'))
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}/`))