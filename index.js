const express = require('express')
const exphbs  = require('express-handlebars')
const session = require('express-session')
const FilieStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()

const conn = require('./db/conn')

// Models
 const Tought = require('./models/Tought')
 const User = require('./models/User')

 // Import Routes
 const toughstRoutes = require('./routes/toughtsRoutes')
 const AuthRouter = require('./routes/authRoutes')

 // import Controller
 const ToughtController = require('./controllers/ToughtController')
 const AuthController = require('./controllers/AuthController')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber a resposta do body
app.use(
  session({
  name:'session',
  secret:'nosso_secret',
  resave: false,
  saveUninitialized: false,
  store: new FilieStore({
    logFn: function(){},
    path: require('path').join(require('os').tmpdir(), 'session'),
  }),
  cookie: false,
  maxAge: 36000,
  expires: new Date(Date.now() + 36000),
  httpOnly: true
  
}), 
)

app.use(express.json())

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {

  if(req.session.userid){
    res.locals.session = req.session
  }

  next()
})

// Routes
app.use('/toughts', toughstRoutes)
app.use('/', AuthRouter)

app.get('/', ToughtController.showToughts)

// sesson middleware -> diz onde vai salvar a session
conn
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))

  //.sync({force: true}) ---> refaz as conexao das tabelas com o banco de dados