
import Typography from '@mui/material/Typography';

const RecipePageSectionHeader = (props) => {
  return (

      <Typography
        component="h2"
        sx={{fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px'}}
      >
        {props.recipeTitle}
      </Typography>
  )
};


export default RecipePageSectionHeader;
