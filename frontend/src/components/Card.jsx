import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
    const { _id, productImg, name, price } = item;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${_id}`);
    };

    return (
        <article
            className="relative w-36 md:w-48 lg:w-56 h-44 md:h-48 lg:h-56 sm:p-4 md:m-12 my-16"
            data-testid={`product-card-${_id}`}
        >
            <div className='md:bg-gray-300 w-36 md:w-48 lg:w-56 h-56 rounded-full'>
                <img
                    src={productImg}
                    alt={`${name} product image`}
                    className="w-auto md:w-full h-auto md:h-full object-cover rounded-full bg-blend-overlay"
                    loading="lazy"
                />
                <h3 className="myProductCardDetails absolute -top-8 left-0 font-bold text-black text-lg text-ellipsis">{name}</h3>
                <p className="myProductCardDetails absolute -bottom-4 md:-bottom-8 right-0 md:-right-6 text-orange-500 mt-4 font-bold text-xl md:text-2xl">₹{price}</p>
                <button
                    className="absolute inset-0 cursor-pointer bg-transparent border-none"
                    onClick={handleClick}
                    data-testid={`product-card-${_id}-view-btn`}
                    aria-label={`View details for ${name}`}
                />
            </div>
        </article>
    );
};

export default Card;