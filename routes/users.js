const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'users'})
})

module.exports = router
// http:localhost:3000/     api/v1/ users
// api "aplicación de interfaz programable"