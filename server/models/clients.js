module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define('clients', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fb: {
      type: DataTypes.STRING,
    },

    address: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    otpCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    otpTime: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  clients.associate = (models) => {
    clients.hasMany(models.clientcourses, {
      foriegnKey: 'clientId',
      onDelete: 'CASCADE',
    });
    clients.hasMany(models.notifications, {
      foriegnKey: 'clientId',
      onDelete: 'CASCADE',
    });
    clients.hasMany(models.orders, {
      foriegnKey: 'clientId',
      onDelete: 'CASCADE',
    });
    clients.hasMany(models.clientexams, {
      foriegnKey: 'clientId',
      onDelete: 'CASCADE',
    });
  };

  return clients;
};
