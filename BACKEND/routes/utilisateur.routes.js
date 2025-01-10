const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);
    router.post("/signup", utilisateur.signup);
    router.post("/update", checkJwt, utilisateur.update);
  
    app.use('/api/utilisateur', router);
  };
