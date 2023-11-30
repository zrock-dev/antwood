import RatingSummary from "./RatingSummary"
import ReviewForm from "./ReviewForm"
import Review from "./Review"
import { useState, useEffect } from "react"
import "@/styles/reviews/product_review.css"
import { getReviewsByAmount } from "@/requests/ReviewRequest"
import {toast} from "sonner"
const ProductReview = ({ product }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        showMoreReviews()
    }, [])


    const showMoreReviews = () => {
        getReviewsByAmount(product._id, 0, reviews.length+3).then((data) => {
            product.reviews  = data.summaryUpdate
            setReviews(data.reviews)
        }).catch((err) => {
            location.replace("/")
        })
    }

    const showLessReviews = () => {
        let size = reviews.length
        let toRemove = 0
        if (size > 3) {
            if (size - 3 < 3) {
                toRemove = size - 3
            } else {
                toRemove = 3
            }
            const reducedReviews = reviews.slice(0, reviews.length - toRemove);
            setReviews(reducedReviews);
        }
    }

    const thereIsMoreReviews = () => {
        return reviews.length < product.reviews.total
    }

    return <div className="product-details-main-container">
        <div className={"review_form_ctn"}>
        <ReviewForm
                product={product}
                setReviews={setReviews}
            />
            
            <div
                className={"review_ctn"}>
                {reviews.map((review) => (
                    <Review
                        key={review._id}
                        review={review}
                    />
                ))
                }

                <div className={"show_more_ctn"}>
                    {thereIsMoreReviews()
                        && <a
                            onClick={showMoreReviews}>
                            Show more
                        </a>
                    }
                    {reviews.length > 3
                        && <a
                            onClick={showLessReviews}>
                            Show less
                        </a>
                    }
                </div>

            </div>
        </div>
        <div>
            <RatingSummary reviews={product.reviews} />
        </div>

    </div>
}

export default ProductReview
