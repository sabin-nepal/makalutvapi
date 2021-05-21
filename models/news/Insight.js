const Sequelize = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const { User } = require('../User')
var slugify = require('slugify')

const Insight = db.define("insight", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  images: Sequelize.JSON,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
 
});

Insight.belongsToMany(Category, { through: 'CategoryInsight' });
Category.belongsToMany(Insight, { through: 'CategoryInsight' });
exports.Insight = Insight;
exports.Category = Category;