'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contest = sequelize.define('Contest', {
  	entry_fee: { 
      type:DataTypes.FLOAT, 
      allowNull: false
    }
  }, { timestamps: false, underscored: true });
  Contest.associate = function(models) {
    models.Contest.hasOne(models.ContestInstance,{ foreignKey: 'contest_id'})
  };
  return Contest;
};