module.exports = (sequelize, Sequelize) => {
  const Utilisateurs = sequelize.define("utilisateurs", {

   id: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false
      },  
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },    
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
    }
 });
return Utilisateurs;
};
