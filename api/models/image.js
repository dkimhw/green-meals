const getImageModel = (sequelize, { DataTypes }) => {
  const RecipeImage = sequelize.define('recipe_image', {
      image_key: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }
    }
    , {
      updatedAt: 'updated_at',
      createdAt: 'created_at',
      recipeId: 'recipe_id'
  });

  RecipeImage.associate = (models) => {
    RecipeImage.belongsTo(models.Recipe);
  }

  return RecipeImage;
};

export default getImageModel;
