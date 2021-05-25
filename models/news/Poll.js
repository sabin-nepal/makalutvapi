const Sequelize = require("sequelize");
const db = require("../../config/db");
var slugify = require('slugify')
const { PollResult } = require( './PollResult')
const { User } = require('../User')
var slugify = require('slugify')
const Poll = db.define("poll", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug: Sequelize.TEXT,
  image: Sequelize.STRING,
  content: Sequelize.JSON,
  endDate:Sequelize.DATE,
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
Poll.beforeSave(async function (poll) {
  try {
    const slug = slugify(news.title,{
            replacement: '-',
            remove: '?',     
          });;
    const count = await Poll.count({
          where: {
            title: poll.title,
          },
        });
  if(!count)
    poll.slug = slug;
  else{ 
    const i = count + 1;
    poll.slug = slug+'-'+i; 
  }
  } catch (e) {
    throw new Error();
  }
});
Poll.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
Poll.hasOne(PollResult,{ onDelete: 'cascade' });
exports.Poll = Poll;
exports.PollResult = PollResult;