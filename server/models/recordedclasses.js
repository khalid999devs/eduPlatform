module.exports = (sequelize, DataTypes) => {
  const recordedclasses = sequelize.define(
    'recordedclasses',
    {
      videoURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      videoTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      folder: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      desc: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: true }
  );

  recordedclasses.associate = (models) => {
    recordedclasses.belongsTo(models.courses);
  };

  return recordedclasses;
};
