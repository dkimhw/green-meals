import { Typography } from '@mui/material';
import { Fragment } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

export const IngredientsList = (props) => {
  return (
    <Fragment>
      <Typography component="h2" sx={{fontWeight: 'bold', fontSize: '1.5rem', mt: '2.5rem'}}>Ingredients</Typography>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {props.ingredients ? props.ingredients.map(ingredient => {
            return (
              <ListItem key={ingredient.id}>
                <ListItemIcon>
                  <CheckIcon sx={{color: 'teal'}}/>
                </ListItemIcon>
                <ListItemText primary={ingredient.ingredient_name} />
              </ListItem>
            )
          }) : '' }
        </List>
      </Box>
    </Fragment>
  )
};
