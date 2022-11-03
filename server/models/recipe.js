

const getRecipeModel = (sequelize, { DataTypes }) => {
  const Recipe = sequelize.define('recipe', {
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    recipe_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  return Recipe;
};

export default getRecipeModel;
