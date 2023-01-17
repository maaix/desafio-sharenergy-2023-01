const routes = require('express').Router();
const auth = require('./AuthRoutes')
const user = require('./UserRoutes')
const customer = require('./CustomerRoutes')

routes.use('/auth', auth)
routes.use('/user', user)
routes.use('/customer',customer)

module.exports = routes;