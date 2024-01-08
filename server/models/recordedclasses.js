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
