module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paidStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
