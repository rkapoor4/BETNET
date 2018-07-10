'use strict';
//import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: { 
      type:DataTypes.STRING, 
      unique:true, 
      validate: { 
        isEmail: true 
      } 
    },
    display_name: { 
      type:DataTypes.STRING,
      unique:true 
    },
    password: { 
      type:DataTypes.STRING, 
      validate: { 
        len:[8,20] 
      } 
    },
    balance: { 
      type:DataTypes.FLOAT, 
      defaultValue: 0 
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  //USER.prototype.generateHash = function(password) {
  //  return bcrypt.hash(password, bcrypt.genSaltSync(8));
  //};
  //USER.prototype.validPassword = function(password) {
  //  return bcrypt.compare(password, this.password);
  //};
  return User;
};