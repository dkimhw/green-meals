import { InputLabel, Button, Typography, Container, Box } from '@mui/material'
import useFormInput from '../../hooks/useFormInput';
import { validateReviewRatings, validateTextInput } from '../../utils/validateInputs';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import TextAreaInput from '../UI/TextAreaInput';
import FormInputAlert from '../UI/FormInputAlert';
import { useTheme } from '@mui/material/styles';
import { useParams } from "react-router-dom";

export const RecipeReviewForm = (props) => {
  const isEditForm = props.id ? true : false;
  const params= useParams();
  const theme = useTheme();

  const errorCss = {
    'color': theme.palette.error.main
  };

  const {
    value: reviewText
    , isValid: isReviewTextInputValid
    , hasError: hasReviewTextInputError
    , errMsg: reviewTextErrorMsg
    , blurInputHandler: handleReviewTextBlur
    , valueChangeHandler: handleReviewTextChange
    , serverSideError: reviewTextServerSideError
    , serverSideErrorMsgs: reviewTextServerSideErrorMsgs
  } = useFormInput(validateTextInput);

  const {
    value: reviewRating,
    isValid: isReviewRatingInputValid,
    hasError: hasReviewRatingInputError,
    errMsg: reviewRatingErrorMsg,
    blurInputHandler: reviewRatingBlurInputHandler,
    valueChangeHandler: reviewRatingChangeHandler,
    serverSideError: reviewRatingServerSideError,
    serverSideErrorMsgs: reviewRatingServerSideErrorMsgs,
  } = useFormInput(validateReviewRatings);

  // Submit recipe information
  const createHandler = async (event) => {
    event.preventDefault();

    try {
      handleReviewTextBlur();
      reviewRatingBlurInputHandler();

      console.log(reviewRating);
      console.log(reviewText);

      if (isReviewTextInputValid && isReviewRatingInputValid) {
        const reviewFormInfo = new FormData();
        reviewFormInfo.append('reviewRating', reviewRating);
        reviewFormInfo.append('reviewText', reviewText);

        const response = await axios({
          method: "post",
          url: `http://localhost:5051/api/reviews/${params.id}/create`,
          data: reviewFormInfo,
          headers: { "Content-Type": "application/json" }
        });

        console.log("review response", response);
      }
    } catch (err) {
      console.log("review error", err);
    }
  }

  const editHandler = (event) => {

  }

  const submitHandler = (event) => {
    return !isEditForm ? createHandler(event) : editHandler(event);
  };

  return (
    <Container sx={{
      marginTop: '2rem'
    }}>
      <Box sx={{
        maxWidth: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography
          variant='h1'
          sx={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            mb: '1rem'
          }}
        >
          Write a review
        </Typography>
        <form
          method="post"
          onSubmit={ submitHandler }
        >
          <InputLabel
            sx={ hasReviewRatingInputError || reviewRatingServerSideError ? errorCss : {}}
          >
            Your Ratings
          </InputLabel>
          <Rating
            name="review-rating"
            sx={{
              mb: '1rem',
              mt: '.5rem',
            }}
            onClick={reviewRatingChangeHandler}
            onBlur={reviewRatingBlurInputHandler}
            value={Number(reviewRating)}
          />
          { hasReviewRatingInputError || reviewRatingServerSideError ?
            <FormInputAlert
              msg={
                hasReviewRatingInputError ? reviewRatingErrorMsg : ''
                || reviewRatingServerSideError ? reviewRatingServerSideErrorMsgs[0] : ''
              }
              css={
                {'marginBottom': '1rem', 'fontSize': '.75rem', 'color': '#d32f2f', 'marginLeft': '14px'}
              }
            /> : ''
          }
          <InputLabel
            sx={ hasReviewTextInputError || reviewTextServerSideError ? errorCss : {}}
          >
            Your Review
          </InputLabel>
          <TextAreaInput
            id={`review-note`}
            name='review-note'
            placeholder="e.g. This recipe is a must try."
            error={hasReviewTextInputError || reviewTextServerSideError}
            helperText={ hasReviewTextInputError ? reviewTextErrorMsg : '' || reviewTextServerSideError
              ? reviewTextServerSideErrorMsgs[0] : '' }
            value={reviewText || ''}
            onChange={handleReviewTextChange}
            onBlur={handleReviewTextBlur}
          />
          <Button variant="outlined" type="submit" sx={{mt: '1.5rem', width: '5.5rem', display: 'block'}}>Submit</Button>
        </form>
      </Box>
    </Container>
  )
};

export default RecipeReviewForm;
