export default (sequelize, DataTypes) => {
  const Definition = sequelize.define('User', {
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    // email: {
    //   allowNull: false,
    //   type: DataTypes.STRING
    // },
    // created_at: {
    //   allowNull: false,
    //   type: DataTypes.DATE
    // },
  
    // label: {
    //   allowNull: false,
    //   type: DataTypes.STRING,
    // },
    // status: {
    //   allowNull: false,
    //   defaultValue: 'N',
    //   type: DataTypes.STRING,
    // },
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
