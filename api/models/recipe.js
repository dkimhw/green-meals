
// https://www.robinwieruch.de/postgres-express-setup-tutorial/
const getRecipeModel = (sequelize, { DataTypes }) => {
  const Recipe = sequelize.define('recipe', {
    recipe_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    recipe_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cooking_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cooking_time_qty: {
      type: DataTypes.ENUM('minutes', 'hours', 'days'),
      allowNull: false,
      defaultValue: 'minutes',
    },
    prep_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prep_time_qty: {
      type: DataTypes.ENUM('minutes', 'hours', 'days'),
      allowNull: false,
      defaultValue: 'minutes',
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recipe_privacy_status: {
      type: DataTypes.ENUM('public', 'private'),
      allowNull: false,
      defaultValue: 'public',
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient, { onDelete: 'CASCADE' });
    Recipe.hasMany(models.Instruction, { onDelete: 'CASCADE' });
    Recipe.hasMany(models.RecipeNote, { onDelete: 'CASCADE' });
  };
  return Recipe;
};

export default getRecipeModel;
