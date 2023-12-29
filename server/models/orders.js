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
      createdDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invoiceNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: true }
  );

  orders.associate = (models) => {
    orders.belongsTo(models.clients);
  };

  return orders;
};
