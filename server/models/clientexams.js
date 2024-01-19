module.exports = (sequelize, DataTypes) => {
  const clientexams = sequelize.define(
    'clientexams',
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answers: {
        type: DataTypes.TEXT,
        defaultValue: '[]',
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isFileChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      otherData: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
    },
    { timestamps: true }
  );

  clientexams.associate = (models) => {
    clientexams.belongsTo(models.clients);
  };

  return clientexams;
};
