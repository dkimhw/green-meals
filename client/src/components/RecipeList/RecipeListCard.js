import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';

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
      sx={{border: '1px solid rgba(0, 0, 0, 0.15)', boxShadow: 'none', height: '100%', display: 'flex'
      , flexDirection: 'column', justifyContent: "space-between", position: 'relative' }}
    >
      <IconButton
        aria-label="add to favorites"
        sx={{
          position: 'absolute',
          top: '1%',
          right: '2%',
          color: '#fff',
          backgroundColor: '#FE6244',
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <Box sx={{flexBasis: '40%', height: '100%'}}>
        {recipeImages[0] ?
          <CardMedia
            component="img"
            src={recipeImages[0].s3ImageUrl}
            sx={{
              aspectRatio: '1/1'
            }}
          /> : '' }
      </Box>

      <CardContent>
        <Box         sx={{
          flexBasis: '20%'
        }}>
         <Typography component="h4" sx={{fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px'}}>{props.recipeTitle}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexBasis: '10%'
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
      {/* <CardActions
        sx={{
          flexBasis: '15%'
        }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          sx={{
            margin: '0',
          }}
        >
          <ShareIcon />
        </IconButton>
      </CardActions> */}
      <Box>
        <Button
          variant="contained"
          href={`/edit-recipe/${props.recipeId}`}
          sx={{
            margin: '0rem 0rem 1rem 1rem',
          }}
        >
          Edit
        </Button>
      </Box>
    </Card>
  );
}

export default RecipeListCard;
