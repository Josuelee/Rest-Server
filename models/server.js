const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.api = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.contactPath = "/api/contacts";
    //middlewares - funciones que se ejecutan siempre que se levanta mi app
    this.middlewares();
    //Rutas de mi app
    this.routers();
  }

  middlewares() {
    //Cors - Proteger mi APP, restringir quien usa mi restapi

    this.api.use(cors());

    // Lectura y parseo del body - no importando que metodo sea POST-PUT-DELETE-ETC
    this.api.use(express.json());

    // Servir contenido estatico
    this.api.use(express.static("public"));
  }

  routers() {
    this.api.use(this.userPath, require("../routes/users"));
  }

  listen() {
    this.api.listen(this.port, () => {
      console.log(`App running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
