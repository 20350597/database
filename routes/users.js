const express = require('express')
const router = express.Router()
const {listUsers, listUserByID, addUser} = require('../controllers/users')

router.get('/', listUsers);
router.get('/:id', listUserByID); //  http:localhost:3000/api/v1/users/?   //obtiene
//router.post('/', listUsers);
router.put('/', addUser)  
//router.patch('/', listUsers);   //modifica
//router.delete('/', listUsers);


module.exports = router
// http:localhost:3000/api/v1/users
// api "aplicación de interfaz programable"