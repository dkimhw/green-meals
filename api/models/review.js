
const getReviewModel = (sequelize, { DataTypes }) => {
  const Review = sequelize.define('review', {
    review_title: {
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
    review_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
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
