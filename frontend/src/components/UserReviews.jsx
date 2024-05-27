import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewApiInstance from '../api/reviewApi';
import { useAuth } from '../hooks/useAuth';

const UserReviews = () => {
    const { state } = useAuth();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await ReviewApiInstance.getAllReviews();
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchReviews();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 50,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="m-8 mt-16">
            <div className='flex justify-between container'>
                <h2 className="text-4xl sm:text-5xl ml-8">User Reviews</h2>
                {state.isAuthenticated && (
                    <a href='/review/createNew'>
                        <button className='p-2 sm:py-4 sm:px-8 bg-green-500 rounded-lg'>Write Review</button>
                    </a>
                )}
            </div>
            <Slider {...settings} className='w-4/5 m-auto my-16'>
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Slider>
        </div>
    );
};

export default UserReviews;