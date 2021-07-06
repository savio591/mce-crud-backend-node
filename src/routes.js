const express = require('express')
require('./database/index')

const routes = express.Router()
const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')
const Middleware = require('./middlewares/auth')

routes.get('/users', Middleware.auth, UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)
routes.post('/auth', AuthController.store)

module.exports = routes
