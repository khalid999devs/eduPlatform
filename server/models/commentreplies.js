module.exports = (sequelize, DataTypes) => {
  const commentreplies = sequelize.define(
    'commentreplies',
    {
      user: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      mentionedUser: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      reply: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      filesUrl: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
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

  commentreplies.associate = (models) => {
    commentreplies.belongsTo(models.discussions);
  };

  return commentreplies;
};
