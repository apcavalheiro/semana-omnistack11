const express = require('express')
const routes = express.Router()
const { createOng, getAllOngs } = require('./controllers/OngController')
const { createIncident, getAllIncidents,
    deleteIncidents } = require('./controllers/IncdentController')
const { getIncidentsByOng } = require('./controllers/ProfileController')
const { createSession } = require('./controllers/SessionController')

routes.post('/sessions', createSession)
routes.get('/ongs', getAllOngs)
routes.post('/ongs', createOng)

routes.post('/incidents', createIncident)
routes.get('/incidents', getAllIncidents)
routes.delete('/incidents/:id', deleteIncidents)

routes.get('/profile', getIncidentsByOng)
module.exports = routes