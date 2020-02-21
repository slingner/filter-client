import React from 'react';

const Review = (props) => {
  return (
    <li>
      {props.reviewText}
      <button className='delete-review-button' onClick={() => props.deleteReview(props.reviewId)}>Delete</button>
    </li>
  )
}

export default Review;