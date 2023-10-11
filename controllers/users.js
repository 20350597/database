const {request, response} = require('express');
const usersModel = require('../models/users');
const pool = require('../db');

    const listUsers = async (req = request, res = response) => {
      let conn;

      try{
        conn = await pool.getConnection();

        const users = await conn.query(usersModel.getAll, (err)=>{
          if (err){
            throw err;
          }
        })

        res.json(users)

      }catch (error) {
        console.log(error);
        res.status(500).json(error);  //función del endpoint

      } finally{
        if(conn){
          conn.end();} //utileria que nos da acceso a un archivo de configuración de entorno
      }
    }

    module.exports = listUsers