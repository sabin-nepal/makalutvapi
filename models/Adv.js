const Sequelize = require("sequelize");
const db = require("../../config/db");

const Adv = db.define("advertisement", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.STRING,
  image:Sequelize.STRING,
  startDate:Sequelize.DATE,
  endDate:Sequelize.DATE,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});
exports.Adv = Adv;