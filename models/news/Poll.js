const Sequelize = require("sequelize");
const db = require("../../config/db");

const Poll = db.define("poll", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  endDate:Sequelize.DATE,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});
exports.Poll = Poll;