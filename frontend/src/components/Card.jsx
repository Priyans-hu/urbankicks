import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
    const { _id, productImg, name, price } = item;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${_id}`);
    };

    return (
        <div className="relative w-56 h-56 m-12">
            <img
                src={productImg}
                alt={name}
                className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute top-2 left-2 text-black font-bold text-lg">{name}</div>
            <div className="absolute bottom-2 right-2 text-orange-500 mt-4 font-bold text-2xl">₹{price}</div>
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={handleClick}
            ></div>
        </div>
    );
};

export default Card;