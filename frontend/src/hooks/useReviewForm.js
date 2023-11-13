"use client";
import { useRef, useState } from 'react'
import { toast } from 'sonner';
const defaultReview = {
  id: "",
  email: "",
  description: "",
  rate: 0
}
const defaultErrorForm = {
  rating :"",
  description:""
}

function useReviewForm() {
  const [review, setReview] = useState(defaultReview);
  const [error, setError] = useState(defaultErrorForm)
  const maxChars = 400;

  const resetReview = () => {
    setError(defaultErrorForm)
    setReview(defaultReview);
  };
  const handleInputChange = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px'; 
  
    const { name, value } = textarea;

    const lines = value.split("\n");
    if (lines.length > 6) {
      return
    }
    setReview({ ...review, [name]: value });
  }

  const textSize  = () => {
    return review.description.length
  }

  const validateForm = () => {
    const errorFieldForm  ={...defaultErrorForm}
    let isValidForm = true
    if (review.rate === 0) {
      errorFieldForm.rating = "Please select a rating"
      isValidForm = false
    }
    
    if (textSize() === 0) {
      errorFieldForm.description = "Please add a review"
      isValidForm = false
    }

    if (textSize() > maxChars) {
      errorFieldForm.description = `Maximum ${maxChars} characters allowed`
      isValidForm = false
    }

    setError(errorFieldForm)
    return isValidForm
  }

  const handleStarClick = (selectedRating) => {
    if (review.rate === selectedRating) {
      selectedRating--;
    }
    setReview({ ...review, rate: selectedRating });
  }



  return {
    review,
    resetReview,
    handleInputChange,
    handleStarClick,
    validateForm,
    textSize,
    error
  }

}

export default useReviewForm