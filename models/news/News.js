const Sequelize = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const { User } = require('../User')
var slugify = require('slugify')

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
  excerpt: Sequelize.TEXT,
  type:Sequelize.STRING,
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

News.beforeSave(async function (news) {
  try {
    const slug = slugify(news.title);
    const count = await News.count({
          where: {
            title: news.title,
          },
        });
  if(!count)
    news.slug = slug;
  else{ 
    const i = count + 1;
    news.slug = slug+'-'+i; 
  }
  } catch (e) {
    throw new Error();
  }
});

News.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
Category.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
News.belongsToMany(Category, { through: 'CategoryNews' });
Category.belongsToMany(News, { through: 'CategoryNews' });
exports.News = News;
exports.Category = Category;