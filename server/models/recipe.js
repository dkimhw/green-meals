

const getRecipeModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('user', {
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
  });

  return User;
};

export default getRecipeModel;
