import * as Sequelize from 'sequelize';

module.exports = function(sequelize: Sequelize.Sequelize, DataTypes) {
  let definition = sequelize.define('definition', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    term_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "NORMAL"
    },
    upvote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    downvote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    }
  }, { 
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  
  return definition;
}