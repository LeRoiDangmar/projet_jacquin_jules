const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const catalogue = require("../controllers/catalogue.controllers.js");
  
    var router = require("express").Router();
  

   
    router.get('/produits-preview', catalogue.getProduitsPreview);

    router.get('/produits/:id', catalogue.getProduitFull);
    
    router.get('/produits-bycat/:id_categorie', catalogue.getProduitsByCat);
    
    router.get('/produits-featured', catalogue.getProduitsFeatured);
    
    router.get('/categories', catalogue.getCategories);
  
    app.use('/api/catalogue', router);
  };
