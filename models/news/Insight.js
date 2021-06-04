const Sequelize = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const Media = require("../Media");
const { User } = require('../User')
var slugify = require('slugify')

const Insight = db.define("insight", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
 
});
Insight.belongsTo(User);
Insight.belongsTo(Media,{ as:'background'})
Insight.belongsToMany(Media,{ as:'media',through: 'InsightMedia' });
Media.belongsToMany(Insight,{ through: 'InsightMedia'});
Insight.belongsToMany(Category, { through: 'CategoryInsight' });
Category.belongsToMany(Insight, { through: 'CategoryInsight' });
exports.Insight = Insight;
exports.Category = Category;