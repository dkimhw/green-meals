
import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import classes from './AddIngredientsFormSection.module.css';
import CloseIcon from '@mui/icons-material/Close';

const AddIngredientsFormSection = () => {
  const ingredientsInputs = [
    { id: 0, ingredient_name: '', placeholder: 'e.g. Flour' },
    { id: 1, ingredient_name: '', placeholder: 'e.g. Sugar' },
    { id: 2, ingredient_name: '', placeholder: 'e.g. Olive oil' },
  ]
  const [ingredients, setIngredients] = React.useState(ingredientsInputs);

  const addNewInput = () => {
    let maxId = Math.max(...ingredients.map(ingredient => ingredient.id));
    maxId < 0 ? maxId = 0 : maxId = maxId + 1;
    setIngredients([...ingredients, { id: maxId, ingredient_name: '', placeholder: 'Add a new ingredient' }]);
  };

  const removeIngredient = (id) => {
    const values = [...ingredients];
    values.splice(values.findIndex(value => value.id === id), 1);
    setIngredients(values);
  };

  const handleIngredientNameChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const id = event.target.id.split('-')[splitIdLen - 1];
    let findIdx = ingredients.findIndex(ingredient => ingredient.id === parseInt(id));
    const values = [...ingredients];
    values[findIdx].ingredient_name = event.target.value;
    setIngredients(values);
  };

  return (
    <React.Fragment>
      {ingredients.map((input) => {
        return (
          <div className={classes['ingredients-form-group']} key={input.id}>
            <TextField
              id={`recipe-name-${input.id}`}
              name={`recipe-name-${input.id}`}
              placeholder={input.placeholder}
              defaultValue=""
              onChange={handleIngredientNameChange}
              variant="outlined"
              values={input.ingredient_name}
              label="Ingredient Name"
            />
            <IconButton id={`remove-recipe-name-${input.id}`}  color="primary" onClick={() => removeIngredient(input.id)} aria-label="remove ingredient" component="label">
              <CloseIcon sx={{fontSize: '1.75rem'}}/>
            </IconButton>
          </div>
        )
      })}

      <Button variant="contained" color="primary" sx={{mb: '1rem'}} onClick={addNewInput}>Add Ingredient</Button>
    </React.Fragment>
  )
}

export default AddIngredientsFormSection
