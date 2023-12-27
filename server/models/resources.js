module.exports = (sequelize, DataTypes) => {
  const resources = sequelize.define(
    'resources',
    {
      driveLink: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      filesUrl: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      desc: {
        type: DataTypes.TEXT,
      },
      Title: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );

  resources.associate = (models) => {
    resources.belongsTo(models.courses);
  };

  return resources;
};
