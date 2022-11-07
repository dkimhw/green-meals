
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
    { id: 'ingredient-name0', name: 'ingredientName0', placeholder: 'e.g. 2 cups of flour' },
    { id: 'ingredient-name1', name: 'ingredientName1', placeholder: 'e.g. 1 cup of sugar' },
    { id: 'ingredient-name2', name: 'ingredientName2', placeholder: 'e.g. 1 cup of olive oil' },
  ]
  const [ingredients, setIngredients] = React.useState(ingredientsInputs);
  const [currency, setCurrency] = React.useState('Cup');

  const handleSelectInputChange = (event) => {
    setCurrency(event.target.value);
  };

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
          <div className={classes['ingredients-form-group']} key={index}>
            <TextField
              id={input.id}
              name={input.name}
              placeholder={input.placeholder}
              defaultValue=""
              onChange={handleInputChange}
              variant="outlined"
              label="Ingredient Name"
              className={classes['add-ingredient-input']}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Choose Qty Type"
              value={currency}
              onChange={handleSelectInputChange}
              // helperText="Please select your quantity type"
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
