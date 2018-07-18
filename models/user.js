'use strict';
//import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: { 
      type:DataTypes.STRING,
      unique:true 
    },
    last_name: { 
      type:DataTypes.STRING,
      unique:true 
    },
    email: { 
      type:DataTypes.STRING, 
      unique:true, 
      validate: { 
        isEmail: true 
      } 
    },
    password: { 
      type:DataTypes.STRING, 
      validate: { 
        len:[8,20] 
      } 
    },
    country: { 
      type:DataTypes.STRING,
      allowNull: false 
    },
    street_address: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    city: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    state: { 
      type:DataTypes.STRING
    },
    zip: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    phone_number: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    balance: { 
      type:DataTypes.FLOAT, 
      allowNull: false,
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