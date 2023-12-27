module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentInfo: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      dueDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  orders.associate = (models) => {
    orders.belongsTo(models.clients);
  };

  return orders;
};
