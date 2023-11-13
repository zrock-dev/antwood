import ReviewCalification from "./ReviewCalification";
import "@/styles/reviews/rating_summary.css";
const RatingSummary = ({reviews}) => {
  const califications = [5, 4, 3, 2, 1];
  
  return (
    <div className="rating-summary">
      <span>{reviews.total} reviews</span>
      <ul>
        {califications.map((rating) => (
          <li key={rating}>
            <ReviewCalification rating={rating} interactive={false} /> <span>{"-"}</span> <span>{reviews.ratingSummary[`star${rating}`]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingSummary;
