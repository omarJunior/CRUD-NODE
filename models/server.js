
const express = require("express");
const cors = require('cors');
const bodyParser = require ('body-parser');

const dbConnect = require("../bd/config");


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = { //Rutas
            registro: '/api/registro'
        }

         // Conectar a base de datos
         this.connectDB();

         // Middlewares
         this.middlewares();
 
         // Rutas de mi aplicación
         this.routes();


    }

    async connectDB(){
        await dbConnect;
    } 

    middlewares() {
        // CORS
        this.app.use( cors() );

        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use(this.paths.registro, require("../routes/registro"));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server is running in the PORT", this.port);
        })
    }


}

module.exports = Server;