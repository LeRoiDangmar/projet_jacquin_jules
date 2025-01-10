module.exports = (sequelize, Sequelize) => {
    const Produits = sequelize.define("produits", {
  
     id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          allowNull: false
        },  
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prix: {
        type: Sequelize.FLOAT,
        allowNull: false
      },    
      poids: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      description: {
          type: Sequelize.STRING,
          allowNull: false
      },
      dimensions: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      id_categorie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      en_avant: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
   });
  return Produits;
  };
  