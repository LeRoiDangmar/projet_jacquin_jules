const db = require("../models");
const Produits = db.produits;
const Categories = db.categories;
const Op = db.Sequelize.Op;

exports.getProduitsPreview = (req, res) => {
    Produits.findAll({
        attributes: ['id', 'nom', 'prix', 'note', 'id_categorie', 'en_avant']
    })
    .then(data => {
        if (data.length > 0) {
            const produits = data.map(produit => produit.get({ plain: true }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(produits);
        } else {
            res.status(404).json({
                message: 'No products found.'
            });
        }
    })
    .catch(err => {
        console.error("Error retrieving products preview:", err);
        res.status(500).json({
            message: err.message || "An error occurred while retrieving products."
        });
    });
};


exports.getProduitFull = (req, res) => {
    const id = req.params.id;

    Produits.findByPk(id)
    .then(data => {
        if (data) {
            const produit = data.get({ plain: true });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(produit);
        } else {
            res.status(404).json({
                message: `Cannot find Product with id=${id}.`
            });
        }
    })
    .catch(err => {
        console.error(`Error retrieving product with id=${id}:`, err);
        res.status(500).json({
            message: `Error retrieving product with id=${id}.`
        });
    });
};



exports.getProduitsByCat = (req, res) => {
    const categoryId = req.params.id_categorie;
	    Produits.findAll({
        where: { id_categorie: categoryId },
        attributes: ['id', 'nom', 'prix', 'note', 'id_categorie', 'en_avant']
    })
    .then(data => {
        if (data.length > 0) {
            const produits = data.map(produit => produit.get({ plain: true }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(produits);
        } else {
            res.status(404).json({
                message: `No products found for category id=${categoryId}.`
            });
        }
    })
    .catch(err => {
        console.error(`Error retrieving products for category id=${categoryId}:`, err);
        res.status(500).json({
            message: `Error retrieving products for category id=${categoryId}.`
        });
    });
};
 

exports.getProduitsFeatured = (req, res) => {
    Produits.findAll({
        where: { en_avant: true },
        attributes: ['id', 'nom', 'prix', 'note', 'id_categorie', 'en_avant']
    })
    .then(data => {
        if (data.length > 0) {
            const produits = data.map(produit => produit.get({ plain: true }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(produits);
        } else {
            res.status(404).json({
                message: 'No featured products found.'
            });
        }
    })
    .catch(err => {
        console.error("Error retrieving featured products:", err);
        res.status(500).json({
            message: "An error occurred while retrieving featured products."
        });
    });
};

exports.getCategories = (req, res) => {
    Categories.findAll()
    .then(data => {
        if (data.length > 0) {
            const categories = data.map(categorie => categorie.get({ plain: true }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categories);
        } else {
            res.status(404).json({
                message: 'No categories found.'
            });
        }
    })
    .catch(err => {
        console.error("Error retrieving categories:", err);
        res.status(500).json({
            message: err.message || "An error occurred while retrieving categories."
        });
    });
};

exports.search = (req, res) => {
    const query = req.params.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({
            message: 'Invalid search query provided.'
        });
    }

    Produits.findAll({
        where: {
            nom: {
                [Op.iLike]: `%${query}%` 
            }
        },
        attributes: ['id', 'nom', 'prix', 'note', 'id_categorie', 'en_avant']
    })
    .then(data => {
        if (data.length > 0) {
            const produits = data.map(produit => produit.get({ plain: true }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(produits);
        } else {
            res.status(404).json({
                message: 'No products found matching the query.'
            });
        }
    })
    .catch(err => {
        console.error("Error searching products:", err);
        res.status(500).json({
            message: err.message || "An error occurred while searching for products."
        });
    });
};