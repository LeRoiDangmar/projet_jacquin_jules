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
    /*prenom: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },    
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },*/
    password: {
        type: Sequelize.STRING,
    }
 });
return Utilisateurs;
};
