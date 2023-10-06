const express = require('express');
const usersRouter = require('./routes/users');

class Server {
    constructor(){
        this.app = express(); //this hace referencia a la clase en sí
        this.port = 3000;

       //Paths (parte dinámica de la ruta)
       this.basePath = '/api/v1'
       this.usersPath = `${this.basePath}/users`; 

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json());
    }
    
    
    routes(){
        this.app.use(this.usersPath, usersRouter)
    }
    
    listen(){
        this.app.listen(this.port,()=> {
            console.log('listenig on port ${this.port}')
        })
        
    }
}

module.exports = Server;

// se invoca con // http:localhost:3000/
