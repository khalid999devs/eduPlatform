module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define(
    'reviews',
    {
      user: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
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

  reviews.associate = (models) => {
    reviews.belongsTo(models.courses);
    reviews.hasMany(models.reviewreplies, {
      foriegnKey: 'reviewId',
      onDelete: 'CASCADE',
    });
  };

  return reviews;
};
