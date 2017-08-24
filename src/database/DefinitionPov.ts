import * as Sequelize from 'sequelize';

module.exports = function(sequelize: Sequelize.Sequelize, DataTypes) {
  const DefinitionPov = sequelize.define('DefinitionPov', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    def_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pov_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  return DefinitionPov;
};