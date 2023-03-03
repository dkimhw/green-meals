import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

function getLabelText(label) {
  return label
}

const RecipeListCard = (props) => {
  const [recipeImages, setRecipeImages] = useState([]);
  const fetchRecipeImages = (recipeId) => {
    axios({
      method: "get",
      url: `http://localhost:5051/api/recipes/images?recipeId=${recipeId}`,
    })
      .then((response) => {
        const data = response.data;
        console.log("data", data)
        setRecipeImages(data);
      })
      .catch(error => console.error(`Error: ${error}`));

  }

  useEffect(() => {
    console.log(props);
    if (props.recipeId) {
      fetchRecipeImages(props.recipeId);
    }
  }, [props])




  return (
    <Card
      sx={{border: '1px solid rgba(0, 0, 0, 0.15)', boxShadow: 'none', maxWidth: 300}}
    >
      {recipeImages[0] ? <CardMedia
        component="img"
        height="194"
        src={recipeImages[0].s3ImageUrl}
      /> : '' }
      <CardContent>
        <Typography component="h4" sx={{fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px'}}>{props.recipeTitle}</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="text-feedback"
            value={0}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 1, fontSize: '.8rem', fontWeight: 'normal' }}>{0} Ratings</Box>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default RecipeListCard;
