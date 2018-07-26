'use strict';
import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_name: { 
      type:DataTypes.STRING,
      unique:true 
    },
    first_name: { 
      type:DataTypes.STRING,
    },
    last_name: { 
      type:DataTypes.STRING,
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
        len:[8,60] 
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
    user_id_attachment_url: { 
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
    },
    currency: { 
      type:DataTypes.STRING, 
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate(function(user, options) {
    return cryptPassword(user.password).then(success => {
      user.password = success;
    }).catch(err => {
      if (err) console.log(err);
    });
  });

  User.prototype.changePassword = function changePassword(password){
    return cryptPassword(password).then(success => {
      return this.set('password', success).save()
    }).catch(err => {
      if (err) console.log(err);
    });
  }

  function cryptPassword(password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }

  return User;
};