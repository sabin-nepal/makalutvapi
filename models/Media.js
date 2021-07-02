const Sequelize = require("sequelize");
const db = require("../config/db");
const { User } = require('./User')

const Media = db.define("media", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  path: Sequelize.TEXT,
  type: {
    type: Sequelize.STRING,
    defaultValue: 'thumbnail',
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

Media.belongsTo(User);

module.exports = Media;