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
  title: Sequelize.STRING,
  slug:  Sequelize.TEXT,
  content: Sequelize.TEXT,
  excerpt: Sequelize.TEXT,
  thumbnail:Sequelize.STRING,
  images: Sequelize.JSON,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

Insight.beforeSave(async function (insight) {
  try {
    const slug = slugify(insight.title);
    const count = await Insight.count({
          where: {
            title: insight.title,
          },
        });
  if(!count)
    insight.slug = slug;
  else{ 
    const i = count + 1;
    insight.slug = slug+'-'+i; 
  }
  } catch (e) {
    throw new Error();
  }
});

Insight.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
Insight.belongsToMany(Category, { through: 'CategoryInsight' });
Category.belongsToMany(Insight, { through: 'CategoryInsight' });
exports.Insight = Insight;
exports.Category = Category;