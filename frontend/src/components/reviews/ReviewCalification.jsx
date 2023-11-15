"use client";
import { useState } from "react";
import "@/styles/reviews/review_calification.css";

const availableStars = [1, 2, 3, 4, 5];
function ReviewCalification({rating,onClickRated, interactive=true}) {
  const [hoveredStar, setHoveredStar] = useState(null);
  const setColor = (star) => {
    if (hoveredStar !== null && star <= hoveredStar) {
      return "black";
    }
    return star <= rating ? "black" : "gray";
  }


  const setStarIcon=(star, rating)=>{
    return star <= rating ? "solid" : "regular";
  }

  return (
      <div className="review-calification">
        {availableStars.map((star) => (
          <span
            key={star}
            onClick={() => interactive && onClickRated(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)} 
            onMouseLeave={() => interactive && setHoveredStar(null)}
            style={{
              color: setColor(star, rating),
              cursor: interactive ? "pointer" : "default",
            }}
          >
            <i className={`fa-${setStarIcon(star, rating)} fa-star`}></i>
          </span>
        ))}
      </div>
  );
}

export default ReviewCalification;
