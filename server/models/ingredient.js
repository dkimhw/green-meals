const getIngredientModel = (sequelize, { DataTypes }) => {
  const Ingredient = sequelize.define('recipe', {
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ingredient_quantity_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ingredient_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, { foreignKey: 'recipe_id' });
  }

  return Ingredient;
};

export default getIngredientModel;
