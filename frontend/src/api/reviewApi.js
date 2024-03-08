import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ReviewApi {
    reviewApi = axios.create({
        baseURL: API_BASE_URL + '/reviews',
        withCredentials: true,
    });

    getAllReviews() {
        return this.reviewApi.get('/');
    }

    getReviewById(reviewId) {
        return this.reviewApi.get(`/${reviewId}`);
    }

    createReview(newReviewData) {
        return this.reviewApi.post('/', newReviewData);
    }

    deleteReview(reviewId) {
        return this.reviewApi.delete(`/${reviewId}`);
    }
}

const ReviewApiInstance = new ReviewApi();
export default ReviewApiInstance;
