import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Review from './Review';


const ReviewList = (props) => {
  const [reviewsData, setReviewsData] = useState([]);
  const params = useParams();

  const fetchReviews = async (recipeId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5051/api/reviews/${recipeId}`,
      });
      setReviewsData(response.data?.allReviews?.rows);
      console.log(response.data?.allReviews?.rows);
    } catch (err) {
      console.error(`Error: ${err}`);
      throw new Error(err);
    }
  };

  useEffect(() => {
    if(params.id) {
      fetchReviews(params.id);
    }
  }, [params.id])

  return (
    reviewsData?.length > 0 ? reviewsData.map(review => {
      return <Review key={review.id} review={review} />
    }) : ''
  );
}


export default ReviewList;
