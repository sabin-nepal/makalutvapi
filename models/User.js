const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
     min:{
             args:[6],
             msg:"Minimum 6 characters required in password"
        },
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: {
      args: true,
      msg: "Not Available",
    },
  },
  photo: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  resetPasswordToken: Sequelize.STRING,
  resetPasswordExpire: Sequelize.DATE,
  verificationKey: Sequelize.STRING,
  verificationKeyExpire: Sequelize.DATE,
});

User.beforeSave(async function (user) {
  if (!user.changed("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (e) {
    throw new Error();
  }
});

User.prototype.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

User.prototype.getJwtSignedToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

User.prototype.getPasswordRestToken = async function(){

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    this.save();
    return resetToken;
}

exports.User = User;