const Sequelize = require("sequelize");
const db = require("../../config/db");
const Category = require("../Category")
const Media = require("../Media")
const { User } = require('../User')
const PollResult = require('./PollResult')
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
  pollTitle: Sequelize.STRING,
  endDate: Sequelize.DATE,
  view: Sequelize.STRING,
  url: Sequelize.TEXT,
  type: {
    type: Sequelize.STRING,
    defaultValue: 'news',
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

News.beforeSave(async function (news) {
  try {
    const slug = slugify(news.title,{
        replacement: '-',
        remove: '?',     
      });;
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
Category.belongsTo(Media);
News.belongsToMany(Category, { through: 'CategoryNews' });
Category.belongsToMany(News, { through: 'CategoryNews' });
News.belongsToMany(Media, { through: 'NewsMedia' });
Media.belongsToMany(News, { through: 'NewsMedia' });
News.hasOne(PollResult,{ onDelete: 'cascade' });
exports.News = News;
exports.Category = Category;