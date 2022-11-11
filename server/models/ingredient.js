const getIngredientModel = (sequelize, { DataTypes }) => {
  const Ingredient = sequelize.define('ingredient', {
    ingredient_name: {
      type: DataTypes.STRING,
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
    Ingredient.belongsTo(models.Recipe);
  };

  return Ingredient;
};

export default getIngredientModel;
