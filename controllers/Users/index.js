const {request, response} = require('express');
const pool = require('../../db');

    const listUsers = async (req = request, res = response) => {
      let conn;

      try{
        conn = await pool.getConnection();

        const users = await conn.query('SELECT * FROM Users', (err)=>{
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
          conn.end()
        }
      }
    }

    module.exports = listUsers