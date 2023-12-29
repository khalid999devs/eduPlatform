module.exports = (sequelize, DataTypes) => {
  const clientcourses = sequelize.define('clientcourses', {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  clientcourses.associate = (models) => {
    clientcourses.belongsTo(models.clients);
  };

  return clientcourses;
};
