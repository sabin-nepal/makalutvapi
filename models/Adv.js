const Sequelize = require("sequelize");
const db = require("../config/db");
const { User } = require('./User')
const Media = require('./Media')

const Adv = db.define("advertisement", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.STRING,
  startDate:Sequelize.DATE,
  endDate:Sequelize.DATE,
  position: Sequelize.STRING,
  url: Sequelize.TEXT,
  type: {
    type: Sequelize.STRING,
    defaultValue: 'banner',
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});


Adv.belongsTo(Media)

Adv.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});


module.exports = Adv;