module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unread',
      allowNull: false,
    },
  });

  notifications.associate = (models) => {
    notifications.belongsTo(models.clients);
    notifications.belongsTo(models.Admin);
  };

  return notifications;
};
