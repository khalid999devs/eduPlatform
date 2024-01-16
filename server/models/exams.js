module.exports = (sequelize, DataTypes) => {
  const exams = sequelize.define(
    'exams',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quesAns: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      totalMarks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      examStartTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examEndTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serverExamEndTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return exams;
};
