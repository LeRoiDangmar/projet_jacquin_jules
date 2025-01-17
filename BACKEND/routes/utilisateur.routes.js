const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);
    router.post("/signup", utilisateur.signup);
    router.post("/delete", utilisateur.deluser);
    router.post("/update", utilisateur.updateuser);
    router.get("/getuser", checkJwt, utilisateur.getuser);
  
    app.use('/api/utilisateur', router);
  };
