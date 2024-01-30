import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import PopularProducts from '../components/PopularProducts';

const Homepage = () => {
    return (
        <div className='overflow-hidden'>
            <Header></Header>
            <main>
                <Landing />
                <PopularProducts />
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Homepage
