module.exports = (sequelize, DataTypes) => {
  const clientcourses = sequelize.define('clientcourses', {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    redVidLockState: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    recVidDoneState: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    currentPlVidId: {
      type: DataTypes.STRING,
    },
  });

  clientcourses.associate = (models) => {
    clientcourses.belongsTo(models.clients);
  };

  return clientcourses;
};
