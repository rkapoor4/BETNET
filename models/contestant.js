'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contestant = sequelize.define('Contestant', {
  	contest_instance_id: {
        type: DataTypes.INTEGER
  	},
  	user_id: {
    	type: DataTypes.INTEGER
  	},
    balance: { 
      type:DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['contest_instance_id','user_id']
      }
    ]
  });
  Contestant.associate = function(models) {
    models.Contestant.belongsTo(models.ContestInstance,{ foreignKey: 'contest_instance_id'})
    models.Contestant.belongsTo(models.User,{ foreignKey: 'user_id'})
  };
  return Contestant;
};