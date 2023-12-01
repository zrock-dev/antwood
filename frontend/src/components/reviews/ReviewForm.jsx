"use client";
import ReviewCalification from './ReviewCalification'
import useReviewForm from '@/hooks/useReviewForm';
import Button from '../Button';
import { addReview, getReviewsByUserEmail } from '@/requests/ReviewRequest';
import '@/styles/reviews/review_form.css';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { userCanReview } from "@/requests/ReviewRequest"

function ReviewForm({ product, setReviews }) {
  const reviewHandle = useReviewForm();
  const { isAuthenticated, setShowModalAuth, user, setIsAuthenticated } =
    useAuth();
  const [pendingAction, setPendingAction] = useState(null)
  const maxChars = 400;

  const onAddReview = async (e) => {
    e.preventDefault();
    
    if (!reviewHandle.validateForm()){
        setTimeout(() => {
         reviewHandle.resetError();
        }, 7000);
        return
      }
    if (!isAuthenticated) {
      setPendingAction(() => async (currentUser) =>{ 
        await addReviewToProduct(currentUser)})
      setShowModalAuth(true);
      return
    }
    await addReviewToProduct(user)
  }


  const addReviewToProduct = async (currentUser) => {
    try {
      const validation = await userCanReview(currentUser.email,product._id)
      if(!validation){
        toast.info("purchase required to leave comment")
        return
      }
      
      const data = await getReviewsByUserEmail(product._id, currentUser.email);
      if (data.length > 0) {
        toast.info("you have already reviewed this product")
        return
      }
    } catch (error) {
      location.replace("/");
    }finally{
      reviewHandle.resetReview();
    }

    let review = reviewHandle.review;
    review.description  = review.description.trim();
    review.username = currentUser.username;
    review.userEmail = currentUser.email;
    try{
        const response = await addReview(product._id, review);
        product.reviews = response.sneakerReview;
    review = response.review;
    reviewHandle.resetReview();
    setReviews((reviews) => [review, ...reviews]);
    }catch(error){
      location.replace("/");
    }

  }

  useEffect(() => {
    
    if (pendingAction) {
      pendingAction(user)
      setPendingAction(null)
    }
    if(!isAuthenticated){
      reviewHandle.resetReview();
    }
  }, [isAuthenticated]
  )


  return (
    <form className={"review_form"}>
      <label htmlFor="review" className={"review_title"}>Reviews</label>
      <span className={"review_subtitle"}>Qualification *</span>
      <div className={"review_field_message_ctn"}>
        <ReviewCalification
          rating={reviewHandle.review.rate}
          onClickRated={reviewHandle.handleStarClick}
        />
        <span
          className={"error_form_field_message"}>
          {reviewHandle.error.rating && `* ${reviewHandle.error.rating}`}
        </span>
      </div>
      <textarea
        name="description"
        id="review"
        placeholder='Add review'
        value={reviewHandle.review.description}
        onInput={reviewHandle.handleInputChange}
        ref={reviewHandle.inputRef}
      >
      </textarea>

      <div className={"btn_ctn"}>
        <div>
          <div className={"review_field_message_ctn"}>
            <span
              className={`${(reviewHandle.textSize() > maxChars) && "warning"}`}>
              {`${reviewHandle.textSize()} / ${maxChars}`}
            </span>
            <span className={"error_form_field_message"}>
              {reviewHandle.error.description && `* ${reviewHandle.error.description}`}
            </span>
          </div>
        </div>
        <div className={"btn_ctn"}>

          <Button
            type="reset"
            btnStyle='third_btn'
            onClick={reviewHandle.resetReview}>
            CANCEL
          </Button>
          <Button
            onClick={onAddReview}
          >
            ADD
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm