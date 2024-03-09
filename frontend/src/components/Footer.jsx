import React from 'react';

const Footer = () => {
    return (
        <footer className="text-black py-4 pt-8 border-t">
            <div className="container mx-auto lg:flex justify-between items-center text-center lg:text-left">
                <div className='mb-8 lg:mb-0'>
                    <h2 className="text-xl font-bold">UrbanKicks</h2>
                    <p className="text-sm">Providing quality since 2024</p>
                </div>
                <div className='grid grid-cols-2 gap-8 md:flex justify-evenly lg:justify-between lg:w-2/3'>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                        <ul className='text-gray-600'>
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Company</h3>
                        <ul className='text-gray-600'>
                            <li><a href="/company#aboutUs">About Us</a></li>
                            <li><a href="/company#community">Community</a></li>
                            <li><a href="/company#reviews">Reviews</a></li>
                            <li><a href="/company#team">Our Team</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Social</h3>
                        <ul className='text-gray-600'>
                            <li><a href="https://facebook.com">Facebook</a></li>
                            <li><a href="https://twitter.com">Twitter</a></li>
                            <li><a href="https://linkedin.com">LinkedIn</a></li>
                            <li><a href="https://instagram.com">Instagram</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Support</h3>
                        <ul className='text-gray-600'>
                            <li><a href="#privacyPolicy">Privacy policy</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#contact-support">Contact Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center m-4 mt-16">
                <p>&copy; {new Date().getFullYear()} UrbanKicks. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
