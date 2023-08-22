
const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('ingredient', {
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, { onDelete: 'CASCADE' });
    User.hasMany(models.Review, { onDelete: 'CASCADE' });
  };

  return User;
};

export default getUserModel;
