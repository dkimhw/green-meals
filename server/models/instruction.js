const getInstructionModel = (sequelize, { DataTypes }) => {
  const Instruction = sequelize.define('instruction', {
    instruction_order_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    instruction_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    recipeID: 'recipe_id'
  });

  Instruction.associate = (models) => {
    Instruction.belongsTo(models.Recipe);
  };

  return Instruction;
};

export default getInstructionModel;
