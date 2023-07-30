

export const parseJSONString = async (req, res, next) => {
  const {
    recipeIngredients,
    recipeInstructions,
    recipeNoteTitles,
    recipeNoteMessages
  } = req.body;

  if (recipeIngredients) {
    const parsedIngredients = await JSON.parse(recipeIngredients);
    req.body.recipeIngredients = parsedIngredients;
  }

  if (recipeInstructions) {
    const parsedInstructions = await JSON.parse(recipeInstructions);
    req.body.recipeInstructions = parsedInstructions;
  }

  if (recipeNoteTitles && recipeNoteMessages) {
    const parsedNoteTitles = await JSON.parse(recipeNoteTitles);
    req.body.recipeNoteTitles = parsedNoteTitles;

    const parsedNoteMessages = await JSON.parse(recipeNoteMessages);
    req.body.recipeNoteMessages = parsedNoteMessages;
  }


  next();
}
