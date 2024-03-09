import React, { useEffect, useState } from 'react';
import UserApiInstance from '../api/userApi';

const ReviewCard = ({ review }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [createdAt, setCreatedAt] = useState('');
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await UserApiInstance.getUserDetailsFromId(review.userId);
                setUserInfo(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [review.userId]);

    useEffect(() => {
        const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCreatedAt(formattedDate);

        const starIcons = [];
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                starIcons.push(<span key={i} className="text-yellow-500">&#9733;</span>);
            } else {
                starIcons.push(<span key={i} className="text-gray-300">&#9733;</span>);
            }
        }
        setStars(starIcons);
    }, [review.rating, review.createdAt]);

    return (
        <div className="bg-white rounded shadow flex flex-col justify-between items-center h-full border p-8 mr-4 border-gray-400">
            <div className='mb-4 text-center'>
                <p className="text-xl font-bold">{stars}</p>
                <p className="text-md text-gray-600">{review.reviewText}</p>
            </div>
            <div className="mt-2 text-sm flex flex-col items-center text-gray-500">
                <div className='text-center'>
                    {/* <p>Name: {userInfo ? userInfo.email.split('@')[0] : 'Loading...'}</p> */}
                    <p className='text-black text-lg'>{userInfo ? userInfo.email.split('@')[0] : 'Anonymous'}</p>
                    <p>{createdAt}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
