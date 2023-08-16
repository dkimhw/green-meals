

export const cleanRecipeNotesData = (recipeNoteMessages, recipeNoteTitles, recipeID) => {
  let notes = [];

  for (let idx = 0; idx < recipeNoteTitles.length; idx += 1) {
    notes.push({
      title: recipeNoteTitles[idx]['title'],
      text: recipeNoteMessages[idx]['note']
    })
  };

  return notes.map(note => {
    return {
      title: note.title,
      text: note.text,
      recipeId: recipeID,
    }
  })
}

export const cleanInstructionsData = (instructions, recipeID) => {
  return instructions.map((instruction, idx) => {
    return {
      id: instruction.id,
      instruction_order_number: idx + 1,
      instruction_text: instruction.instruction_text,
      recipeId: instruction.recipeId ? instruction.recipeId : recipeID,
    }
  });
};

export const cleanIngredientsData = (ingredients, recipeID) => {
  return ingredients.map(ingredient => {
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
  for (let item of compArr) {
    if (!userInputIds.includes(item['id'])) {
      // destroy item
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

export const saveImages = async (models, imageData, recipeID) => {
  await models.bulkCreate(
    imageData.map(image => {
      return {
        image_key: image.Key,
        recipeId: recipeID,
      }
    })
  );
}
