
import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import classes from './AddIngredientsFormSection.module.css';


const qty_types = [
  {
    value: 'Cup',
    label: 'Cup'
  },
  {
    value: 'Tablespoon',
    label: 'Tbsp'
  },
  {
    value: 'Teaspoon',
    label: 'Tsp'
  },
  {
    value: 'Ounces',
    label: 'Oz'
  },
];

// https://stackoverflow.com/questions/66469913/how-to-add-input-field-dynamically-when-user-click-on-button-in-react-js
const AddIngredientsFormSection = () => {
  const ingredientsInputs = [
    { id: 0, recipe_name: '', qty: 0, qty_type: '', placeholder: 'e.g. Flour' },
    { id: 1, recipe_name: '', qty: 0, qty_type: '', placeholder: 'e.g. Sugar' },
    { id: 2, recipe_name: '', qty: 0, qty_type: '', placeholder: 'e.g. Olive oil' },
  ]
  const [ingredients, setIngredients] = React.useState(ingredientsInputs);
  const [quantityType, setQuantityType] = React.useState('Cup');

  const addNewInput = () => {
    setIngredients([...ingredients, { id: `ingredient-name${ingredients.length}`, name: `ingredientName${ingredients.length}`, placeholder: 'Add a new ingredient' }]);
    console.log(ingredients);
  };

  // const removeInput = (index) => {
  //   const values = [...ingredients];
  //   values.splice(index, 1);
  //   setIngredients(values);
  // };

  const handleRecipeNameChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const index = event.target.id.split('-')[splitIdLen - 1];
    const values = [...ingredients];
    values[index].recipe_name = event.target.value;
    setIngredients(values);
    console.log(ingredients);
  };

  const handleQtyChange = (event) => {
    event.preventDefault();
    let splitIdLen = event.target.id.split('-').length
    const index = event.target.id.split('-')[splitIdLen - 1];
    const values = [...ingredients];
    values[index].qty = event.target.value;
    setIngredients(values);
    console.log(ingredients);
  };

  const handleQtyTypeChange = (event) => {
    event.preventDefault();
    console.log(event);
    let splitIdLen = event.target.name.split('-').length
    const index = event.target.name.split('-')[splitIdLen - 1];
    const values = [...ingredients];
    values[index].qty_type = event.target.value;
    setIngredients(values);
    console.log(ingredients);
  };


  return (
    <React.Fragment>
      {ingredients.map((input, index) => {
        return (
          <div className={classes['ingredients-form-group']} key={index}>
            <TextField
              id={`recipe-name-${input.id}`}
              name={`recipe-name-${input.id}`}
              placeholder={input.placeholder}
              defaultValue=""
              onChange={handleRecipeNameChange}
              variant="outlined"
              label="Ingredient Name"
            />
            <TextField
              id={`recipe-qty-${input.id}`}
              name={`recipe-qty-${input.id}`}
              placeholder={`e.g. ${Math.ceil(Math.random() * 10)}`}
              defaultValue=""
              onChange={handleQtyChange}
              variant="outlined"
              label="Quantity"
            />
            <TextField
              select
              id = {`recipe-qty-type-${input.id}`}
              name = {`recipe-qty-type-${input.id}`}
              label="Choose Qty Type"
              value='Cup'
              onChange={handleQtyTypeChange}
            >
              {qty_types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </div>
        )
      })}

      <Button variant="contained" color="primary" className={classes['add-ingredient-btn']} onClick={addNewInput}>Add Ingredient</Button>
    </React.Fragment>
  )
}

export default AddIngredientsFormSection
