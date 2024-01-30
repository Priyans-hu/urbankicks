import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Landing = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <Slider {...settings}>
            <div className="relative h-screen w-90vw">
                <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Shoe Collection 1"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">Discover the Latest Shoe Trends</h1>
                    <p className="text-lg">Step into style with our exclusive collection of premium shoes.</p>
                    <a href="/products" className="mt-8 bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">Shop Now</a>
                </div>
            </div>

            <div className="relative h-screen w-90vw">
                <img
                    src="https://images.unsplash.com/photo-1641745900322-df0427549fab?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Shoe Collection 2"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">Step into Comfort and Style</h1>
                    <p className="text-lg">Explore our range of stylish and comfortable footwear for every occasion.</p>
                    <a href="/products" className="mt-8 bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">Shop Now</a>
                </div>
            </div>

            <div className="relative h-screen w-90vw">
                <img
                    src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Shoe Collection 3"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">Elevate Your Style with Trendy Shoes</h1>
                    <p className="text-lg">Find the perfect pair to express your unique fashion sense.</p>
                    <a href="/products" className="mt-8 bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">Shop Now</a>
                </div>
            </div>
        </Slider>
    );
};

export default Landing;
