export default (sequelize, DataTypes) => {
  const Definition = sequelize.define('Definition', {
    label: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      defaultValue: 'N',
      type: DataTypes.STRING,
    },
  });
  
  // Definition.associate = function (models) {
  //   models.Task.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Definition;
};
