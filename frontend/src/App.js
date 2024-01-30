// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Contact from './pages/Contact';
import AuthMiddleware from './middleware/IsAuth';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/product/:productId" element={<ProductDetailPage />} />

				{/* Use AuthMiddleware for protected routes */}
				<Route
					path="/order-history"
					element={<AuthMiddleware element={<OrderHistoryPage />} />}
				/>
				<Route
					path="/cart"
					element={<AuthMiddleware element={<Cart />} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
