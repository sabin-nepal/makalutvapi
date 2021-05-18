const {Sequelize,DataTypes} = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const { User } = require('../User')

const News = db.define("news", {
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug:  Sequelize.TEXT,
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

News.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID
  }
});
Category.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID
  }
});
News.belongsToMany(Category, { through: 'CategoryNews' });
Category.belongsToMany(News, { through: 'CategoryNews' });
exports.News = News;
exports.Category = Category;