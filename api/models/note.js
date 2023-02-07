const getRecipeNoteModel = (sequelize, { DataTypes }) => {
  const RecipeNote = sequelize.define('recipe_note', {
      title: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }
      , text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }
    , {
      updatedAt: 'updated_at',
      createdAt: 'created_at',
      recipeId: 'recipe_id'
  });

  RecipeNote.associate = (models) => {
    RecipeNote.belongsTo(models.Recipe);
  }

  return RecipeNote;
};

export default getRecipeNoteModel;
