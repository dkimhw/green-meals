
import Rating from '@mui/material/Rating';
import { Box, Container, Typography } from '@mui/material'

const Review = (props) => {
  const convertedDate = new Date(props.review.created_at);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Rating value={props.review.review_rating} />
        <Typography variant="p">{convertedDate.toLocaleDateString()}</Typography>
      </Box>
      <p>{props.review.review_text}</p>
    </Container>
  )
}

export default Review;
