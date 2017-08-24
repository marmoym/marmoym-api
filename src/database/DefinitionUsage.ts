import * as Sequelize from 'sequelize';

module.exports = function(sequelize: Sequelize.Sequelize, DataTypes) {
  const DefinitionUsage = sequelize.define('DefinitionUsage', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    def_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usage_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  return DefinitionUsage;
}