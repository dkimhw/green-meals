

export const cleanInstructionsData = async (instructions) => {
  return JSON.parse(instructions).map((instruction, idx) => {
    return {
      id: instruction.id,
      instruction_order_number: idx + 1,
      instruction_text: instruction.instruction,
      recipeId: instruction.recipeId ? instruction.recipeId : recipeID,
    }
  });
};

export const cleanIngredientsData = async (ingredients) => {
  return JSON.parse(ingredients).map(ingredient => {
    return {
      id: ingredient.id,
      ingredient_name: ingredient.ingredient_name,
      recipeId: ingredient.recipeId ? ingredient.recipeId : recipeID,
    }
  });
};

export const getAllItems = async (model, recipeID) => {
  let items = await model.findAll({
    where: {
      recipeId: recipeID
    },
    raw: true
  });

  return items;
};

export const removeDeletedItems = async (inputArr, compArr, model) => {
  // 1. compare the two passed in arrays
  // 2. find the items that have been removed from userInputArr (or if any)
  // 3. destory the records that the user has removed
  let userInputIds = inputArr.map(el => el['id']);
  console.log("compArr: ", compArr);
  for (let item of compArr) {
    console.log("item", item)
    if (!userInputIds.includes(item['id'])) {
      // destory item
      await model.destroy({ where: { id: item['id'] } });
    }
  }
};

export const updateItems = async (models, data, keys) => {
  await models.bulkCreate(
    data,
    {
      updateOnDuplicate: keys,
    }
  );
};
