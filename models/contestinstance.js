'use strict';
module.exports = (sequelize, DataTypes) => {
  var ContestInstance = sequelize.define('ContestInstance', {
  	contest_id: {
        type: DataTypes.INTEGER
  	},
  }, { timestamps: false, underscored: true });
  ContestInstance.associate = function(models) {
    models.ContestInstance.belongsTo(models.Contest,{ foreignKey: 'contest_id'})
  };
  return ContestInstance;
};