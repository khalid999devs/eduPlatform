module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    replied: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  })

  return Contact
}
