const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

  //Open routes
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)

  //Protected routes
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth)

  // API routes

  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(protectedApi, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
}
