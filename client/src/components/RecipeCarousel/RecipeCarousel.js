
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Image } from '@mui/material';
import { useFetchData } from '../../hooks/useFetchData';

const CarouselItem = (props) => {
  return (
    <Paper>
      {props}
      {/* <img src={props.imageURL} alt=""/> */}
    </Paper>
  )
}

export const RecipeCarousel = (props) => {
  const url = `http://localhost:5051/api/recipes/images?recipeId=${props.recipeID}`
  const { data, isPending, error } = useFetchData(url);
  return (
    <Carousel>
        { data ? data.map(image => <CarouselItem key={image.id} imageURL={image.s3ImageUrl} /> ) : '' }
    </Carousel>
  )
}
