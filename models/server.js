const express = require("express");
const cors = require("cors");
const { connectionDB } = require("../database/config");

class Server {
  constructor() {
    this.api = express();
    this.port = process.env.PORT;
    this.path = {
      users: "/api/users",
      auth: "/api/auth",
      categories: "/api/categories",
    };

    // conectarse a la base de datos
    this.conectionDB();

    //middlewares - funciones que se ejecutan siempre que se levanta mi app
    this.middlewares();

    //Rutas de mi app
    this.routers();
  }

  async conectionDB() {
    await connectionDB();
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
    this.api.use(this.path.auth, require("../routes/auth"));
    this.api.use(this.path.users, require("../routes/users"));
    this.api.use(this.path.categories, require("../routes/categories"));
  }

  listen() {
    this.api.listen(this.port, () => {
      console.log(`App running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
