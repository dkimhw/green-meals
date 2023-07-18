
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { useFetchData } from '../../hooks/useFetchData';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CarouselItem = (props) => {
  return (
    <Box
      component="img"
      sx={{
        height: 400,
        width: '100%',
        mt: '1.5rem',
        maxHeight: { xs: 400, md: 600 },
        borderRadius: '10px'
        // maxWidth: { xs: 400, md: 600 },
      }}
      alt=""
      src={props.imageURL}
   />
  )
}

export const RecipeCarousel = (props) => {
  const url = `http://localhost:5051/api/recipes/images?recipeId=${props.recipeID}`;
  const { data } = useFetchData(url);
  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon/>}
      PrevIcon={<ArrowBackIosNewIcon />}
    >
        { data ? data.map(image => <CarouselItem key={image.id} imageURL={image.s3ImageUrl} /> ) : '' }
    </Carousel>
  )
}
