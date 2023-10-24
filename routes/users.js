const express = require('express')
const router = express.Router()
const {listUsers, listUserByID, addUser, updateUser , deleteUser} = require('../controllers/users')

router.get('/', listUsers);
router.get('/:id', listUserByID); //  http:localhost:3000/api/v1/users/?   //obtiene
//router.post('/', listUsers);
router.put('/', addUser)  
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
//router.patch('/', listUsers);   //modifica


module.exports = router
// http:localhost:3000/api/v1/users
// api "aplicación de interfaz programable"