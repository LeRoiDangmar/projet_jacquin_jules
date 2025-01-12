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


exports.getusers = async (req, res) => {
  try {
    // Fetch users with selected attributes
    const users = await Utilisateurs.findAll({
      attributes: ['nom', 'email', 'adresse'],
    });

    if (users.length > 0) {
      // Convert Sequelize instances to plain objects
      const userList = users.map(user => user.get({ plain: true }));
      
      // Send the user list as a JSON response
      res.status(200).json(userList);
    } else {
      // No users found
      res.status(404).json({
        message: 'No utilisateurs found.',
      });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error retrieving users:", error);
    
    // Send a 500 Internal Server Error response
    res.status(500).json({
      message: error.message || "An error occurred while retrieving users.",
    });
  }
};