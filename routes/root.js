const express = require('express')
const router = express.Router()
const userRoutes = require('./users') //el puntito se refiere al directorio

router.use('/users', userRoutes)

module.exports = router

// http://localhost:3000/api/v1/users