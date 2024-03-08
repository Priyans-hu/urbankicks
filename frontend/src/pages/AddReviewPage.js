import React from 'react'
import Header from '../components/Header'
import AddReviewForm from '../components/AddReviewForm'
import Footer from '../components/Footer'

const AddReviewPage = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto my-16 text-center min-h-[51vh] items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Write a Review</h1>
                <AddReviewForm />
            </div>
            <Footer />
        </div>
    )
}

export default AddReviewPage
