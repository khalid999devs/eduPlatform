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
        defaultValue: '{}',
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  clientexams.associate = (models) => {
    clientexams.belongsTo(models.clients);
  };

  return clientexams;
};
