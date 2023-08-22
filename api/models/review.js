
const getReviewModel = (sequelize, { DataTypes }) => {
  const Review = sequelize.define('ingredient', {
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    recipeId: 'recipe_id'
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe);
  };

  // Later when we add in users
  // Review.associate = (models) => {
  //   Review.belongsTo(models.User);
  // };

  return Review;
};

export default getReviewModel;
