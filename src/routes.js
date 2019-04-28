// Dependences
const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

// Middlewares
const AuthMiddleware = require('./app/middlewares/auth')
const GuestMiddleware = require('./app/middlewares/guest')

// Controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')

routes.use((req, res, next) => {
  res.locals.flashSucess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Routes Acess
routes.get('/', GuestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/signup', GuestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)
routes.get('/app/logout', SessionController.destroy)

// Routes Application
routes.use('/app', AuthMiddleware)
routes.get('/app/dashboard', DashboardController.index)

// Appointment
routes.get('/app/appointments/new/:provider', AppointmentController.create)

// Files
routes.get('/files/:file', FileController.show)

module.exports = routes
