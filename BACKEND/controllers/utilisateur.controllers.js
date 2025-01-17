const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
  }

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
     Utilisateurs.findOne({ where: { nom: utilisateur.login } })
    .then(data => {
      if (data) {
        const user = {
          id: data.id,
          name: data.nom,
          //email: data.email
        };
      
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Utilisateur with login=${utilisateur.login}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Error retrieving Utilisateur with login=" + utilisateur.login
      });
    });
  } else {
    res.status(400).send({
      message: "Login ou password incorrect" 
    });
  }
};



exports.signup = async (req, res) => {
  try {
    const utilisateur = {
      login: req.body.login,
      email: req.body.email,
      adresse: req.body.adresse,
      password: req.body.password
    };

    const pattern = /^[A-Za-z0-9]{1,20}$/;
    if (!pattern.test(utilisateur.login) || !pattern.test(utilisateur.password)) {
      return res.status(400).send({
        message: "Login ou password incorrect"
      });
    }

    const existingUser = await Utilisateurs.findOne({ where: { nom: utilisateur.login } });
    if (existingUser) {
      return res.status(400).send({
        message: "Un utilisateur avec ce login existe déjà."
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(utilisateur.password, saltRounds);

    const userId = uuidv4();

    const newUser = await Utilisateurs.create({
      id: userId,
      nom: utilisateur.login,
      password: hashedPassword,
      email: utilisateur.email,
      adresse: utilisateur.adresse
    });

    const user = {
      id: newUser.id,
      name: newUser.nom,
      email: newUser.email,
      adresse: newUser.adresse
    };

    const accessToken = generateAccessToken(user);
    console.log(accessToken);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.status(201).send({
      message: "Utilisateur créé avec succès.",
      user: user
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Erreur lors de la création de l'utilisateur."
    });
  }
};


exports.getuser = async (req, res) => {
  try {
    const userId = jwtGetId(req.headers['authorization']);

    const user = await Utilisateurs.findOne({
      attributes: ['nom', 'email', 'adresse'],
      where: { id: userId }
    });

    if (user) {
      res.status(200).json(user.get({ plain: true }));
    } else {
      res.status(404).json({
        message: 'Utilisateur non trouvé.'
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the user."
    });
  }
};

exports.deluser = async (req, res) => {
  try {
    const userId = jwtGetId(req.headers['authorization']);

    const deletedRows = await Utilisateurs.destroy({
      where: { id: userId }
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Utilisateur non trouvé."
      });
    }

    res.status(200).json({
      message: "Utilisateur supprimé avec succès."
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: error.message || "Une erreur est survenue lors de la suppression de l'utilisateur."
    });
  }
};


exports.updateuser = async (req, res) => {
  try {
    const userId = jwtGetId(req.headers['authorization']);

    const updateData = {};

    if (req.body.login) {
      updateData.nom = req.body.login;
    }

    if (req.body.email) {
      updateData.email = req.body.email;
    }

    if (req.body.adresse) {
      updateData.adresse = req.body.adresse;
    }


    const [updatedRows] = await Utilisateurs.update(updateData, {
      where: { id: userId }
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Utilisateur non trouvé ou aucune donnée à mettre à jour."
      });
    }

    const updatedUser = await Utilisateurs.findOne({
      attributes: ['id', 'nom', 'email', 'adresse'],
      where: { id: userId }
    });

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès.",
      user: updatedUser
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({
      message: error.message || "Une erreur est survenue lors de la mise à jour de l'utilisateur."
    });
  }
};


function jwtGetId(authorizationHeader) {
  if (!authorizationHeader) {
    throw new Error('Authorization header is missing');
  }

  // The header is expected to be in the format "Bearer <token>"
  const token = authorizationHeader.replace('Bearer ', '').trim();

  if (!token) {
    throw new Error('JWT token is missing from the Authorization header');
  }

  try {
    // Make sure you have set process.env.JWT_SECRET with your secret key
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    
    // Assuming the payload has the property "id"
    if (!decoded.id) {
      throw new Error('ID not found in token payload');
    }
    return decoded.id;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    throw error;
  }
}
