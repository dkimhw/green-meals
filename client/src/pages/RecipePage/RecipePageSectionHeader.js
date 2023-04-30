
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import classes from './RecipePageSectionHeader.module.css'

const RecipePageSectionHeader = (props) => {
  return (
    <Box
      sx={{
        mt: '2rem'
      }}
      className={classes.title}
    >
      <Typography
        component="h1"
        sx={{fontSize: '2rem', fontWeight: 'bold', letterSpacing: '1px'}}
      >
        {props.recipeTitle}
      </Typography>
      <Typography
        component="p"
        sx={{mt: '1rem'}}
      >
        {props.recipeDescription}
      </Typography>
    </Box>

  )
};


export default RecipePageSectionHeader;
