module.exports = (sequelize, DataTypes) => {
  const Participants = sequelize.define('participants', {
    qrCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    caRef: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
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
  })
  Participants.associate = (models) => {
    Participants.hasOne(models.ParEvents, {
      foreignKey: 'parId',
      onDelete: 'CASCADE',
      as: 'ParEvent',
    })
  }

  return Participants
}
