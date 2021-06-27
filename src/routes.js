const express = require('express')
require('./database/index')

const routes = express.Router()
const UserController = require('./controller/UserController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

module.exports = routes
