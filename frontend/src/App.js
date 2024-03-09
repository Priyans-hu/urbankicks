// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import './css/ProductCard.css'

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Contact from './pages/Contact';
import AuthMiddleware from './middleware/IsAuth';
import CategoryPage from './pages/CategoryPage';
import NotFound from './pages/NotFound';
import UserAccount from './pages/UserAccount';
import AdminPage from './pages/AdminPage';
import AddProduct from './pages/AddProduct';
import AddReviewPage from './pages/AddReviewPage';
import ManageOrders from './pages/ManageOrders';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/products" element={<ProductPage />} />
				<Route path="/products/category/:type" element={<CategoryPage />} />
				<Route path="/product/:productId" element={<ProductDetailPage />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/review/createNew" element={<AddReviewPage />} />
				
				{/* Authenticated Admin Control routes */}
				<Route path="/admin/dashboard" element={<AuthMiddleware element={<AdminPage />} />} />
				<Route path="/admin/dashboard/newProduct" element={<AuthMiddleware element={<AddProduct />} />} />
				<Route path="/admin/dashboard/manageOrders" element={<AuthMiddleware element={<ManageOrders />} />} />

				{/* Use AuthMiddleware for protected routes */}
				<Route path="/order-history" element={<AuthMiddleware element={<OrderHistoryPage />} />} />
				<Route path="/cart" element={<AuthMiddleware element={<Cart />} />} />
				<Route path="/myaccount" element={<AuthMiddleware element={<UserAccount />} />} />

				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound/>} />
			</Routes>
		</Router>
	);
}

export default App;
