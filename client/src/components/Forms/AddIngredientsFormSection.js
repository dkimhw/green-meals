
import React from 'react';
import { TextField, Button } from '@mui/material';
import classes from './AddIngredientsFormSection.module.css';

// https://stackoverflow.com/questions/66469913/how-to-add-input-field-dynamically-when-user-click-on-button-in-react-js
const AddIngredientsFormSection = () => {
  const ingredientsInputs = [
    { id: 'ingredient-name0', name: 'ingredientName0', placeholder: 'e.g. 2 cups of flour' },
    { id: 'ingredient-name1', name: 'ingredientName1', placeholder: 'e.g. 1 cup of sugar' },
    { id: 'ingredient-name2', name: 'ingredientName2', placeholder: 'e.g. 1 cup of olive oil' },
  ]
  const [ingredients, setIngredients] = React.useState(ingredientsInputs);

  const addNewInput = () => {
    setIngredients([...ingredients, { id: `ingredient-name${ingredients.length}`, name: `ingredientName${ingredients.length}`, placeholder: 'Add a new ingredient' }]);
    console.log(ingredients);
  };

  // const removeInput = (index) => {
  //   const values = [...ingredients];
  //   values.splice(index, 1);
  //   setIngredients(values);
  // };

  const handleInputChange = (event) => {
    event.preventDefault();
    const index = event.target.id.split('ingredient-name')[1];
    const values = [...ingredients];
    values[index].name = event.target.value;
    setIngredients(values);
  };

  return (
    <React.Fragment>
      {ingredients.map((input, index) => {
        return (
          <TextField
            key={index}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            defaultValue=""
            onChange={handleInputChange}
            variant="outlined"
            label={null}
            className={classes['add-ingredient-input']}
          />
        )
      })}

      {/* <TextField
        id={`ingredient-name${ingredientsOrder[0]}`}
        name={`recipeName${ingredientsOrder[0]}`}
        placeholder="e.g. 2 cups of flour"
        defaultValue=""
        className={classes['add-ingredient-input']}
        variant="outlined"
        label={null}
        InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
      />
      <TextField
        id={`ingredient-name${ingredientsOrder[1]}`}
        name={`recipeName${ingredientsOrder[1]}`}
        placeholder="e.g. 1 cup of sugar"
        defaultValue=""
        variant="outlined"
        className={classes['add-ingredient-input']}
        label={null}
        InputLabelProps={{ shrink: true, sx: {'fontSize': '1.25rem'} }}
      /> */}

      <Button variant="contained" color="primary" className={classes['add-ingredient-btn']} onClick={addNewInput}>Add Ingredient</Button>
    </React.Fragment>
  )
}

export default AddIngredientsFormSection
