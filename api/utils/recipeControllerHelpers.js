
export const cleanRecipeNotesData = async(recipeNoteMessages, recipeNoteTitles, recipeID) => {
  let noteTitles = await JSON.parse(recipeNoteTitles);
  let noteMessages = await JSON.parse(recipeNoteMessages);

  let notes = [];
  for (let idx = 0; idx < noteTitles.length; idx += 1) {
    console.log(noteTitles[idx]);
    console.log("Check: ", noteMessages[idx]);
    notes.push({
      title: noteTitles[idx]['note_title'],
      text: noteMessages[idx]['note']
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

export const cleanInstructionsData = async (instructions, recipeID) => {
  return await JSON.parse(instructions).map((instruction, idx) => {
    return {
      id: instruction.id,
      instruction_order_number: idx + 1,
      instruction_text: instruction.instruction_text,
      recipeId: instruction.recipeId ? instruction.recipeId : recipeID,
    }
  });
};

export const cleanIngredientsData = async (ingredients, recipeID) => {
  return await JSON.parse(ingredients).map(ingredient => {
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

export const saveImages = async (imageData, recipeID) => {
  await models.RecipeImage.bulkCreate(
    imageData.map(image => {
      return {
        image_key: image.Key,
        recipeId: recipeID,
      }
    })
  );
}
