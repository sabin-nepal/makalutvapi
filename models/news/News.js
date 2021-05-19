const Sequelize = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const { User } = require('../User')

const News = db.define("news", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug:  Sequelize.TEXT,
  content: Sequelize.TEXT,
  type:Sequelize.STRING,
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

News.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
Category.belongsTo(User, {
  foreignKey: {
    name:"userId",
    type: Sequelize.UUID
  }
});
News.belongsToMany(Category, { through: 'CategoryNews' });
Category.belongsToMany(News, { through: 'CategoryNews' });
exports.News = News;
exports.Category = Category;