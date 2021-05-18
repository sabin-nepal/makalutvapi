const {Sequelize,DataTypes} = require("sequelize");
const db = require("../config/db");

const Category = db.define("category", {
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug: Sequelize.TEXT,
});

module.exports = Category;