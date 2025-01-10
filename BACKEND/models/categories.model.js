module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
  
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
      libelle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
          type: Sequelize.STRING,
          allowNull: false
      }
   });
  return Categories;
  };
  