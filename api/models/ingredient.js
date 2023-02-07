const getIngredientModel = (sequelize, { DataTypes }) => {
  const Ingredient = sequelize.define('ingredient', {
    ingredient_name: {
      type: DataTypes.STRING(1000),
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

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe);
  };

  return Ingredient;
};

export default getIngredientModel;
