import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
    const { _id, productImg, name, price } = item;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${_id}`);
    };

    return (
        <div className="relative w-56 h-56 md:m-12 my-16">
            <div className='bg-gray-300 w-56 h-56 rounded-full'>
                <img
                    src={productImg}
                    alt={name}
                    className="w-full h-full object-cover rounded-full bg-blend-overlay"
                />
                <div className="myProductCardDetails absolute -top-8 left-0 font-bold text-black text-lg text-ellipsis ">{name}</div>
                <div className="myProductCardDetails absolute -bottom-4 right-0 text-orange-500 mt-4 font-bold text-2xl">₹{price}</div>
                <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={handleClick}
                ></div>
            </div>
        </div>
    );
};

export default Card;