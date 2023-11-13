import React from 'react';
import ReviewCalification from './ReviewCalification';

import "@/styles/reviews/review.css";

function Review({ review }) {
  const formatText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <p key={index}>{line}</p>
    ));
  }

  return (
    <div className='review'>
      <span className='review-username'>@{review.username} </span>
      <span className='review-email'>{review.userEmail}</span>
      <ReviewCalification rating={review.rate} interactive={false}/>
      <div className='review-description'>
        {formatText(review.description)}
      </div>
    </div>
  );
}

export default Review;
