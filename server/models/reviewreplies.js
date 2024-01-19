module.exports = (sequelize, DataTypes) => {
  const reviewreplies = sequelize.define(
    'reviewreplies',
    {
      user: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      reply: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      disLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { timestamps: true }
  );

  reviewreplies.associate = (models) => {
    reviewreplies.belongsTo(models.reviews);
  };

  return reviewreplies;
};
