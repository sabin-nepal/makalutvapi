const Sequelize = require("sequelize");
const db = require("../../config/db");
const { Poll } = require('./Poll')

const PollResult = db.define("pollResult", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  yesCount: Sequelize.BIGINT,
  noCount: Sequelize.BIGINT
});
PollResult.belongsTo(Poll);
exports.PollResult = PollResult;