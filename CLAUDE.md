# UrbanKicks - Claude AI Instructions

## Project Overview
UrbanKicks is a full-stack MERN e-commerce application for online shoe shopping. Features include user authentication, shopping cart, order management, and product reviews.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: React 18, Material-UI, TailwindCSS
- **Auth**: JWT with bcrypt password hashing
- **State**: React hooks (no Redux)

## Project Structure
```
urbankicks/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── index.js        # Express entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main app
│   └── package.json
└── README.md
```

## Development Commands
```bash
# Backend
cd backend
cp .env.example .env  # Configure your env vars
npm install
npm start             # Starts with --watch flag

# Frontend
cd frontend
cp .env.example .env
npm install
npm start
```

## Environment Variables

### Backend (.env)
- `DB_PATH` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `PORT` - Server port (default: 8080)

### Frontend (.env)
- `REACT_APP_BASE_URL` - Backend API URL

## API Endpoints

### Auth
- `POST /users/register` - Register new user
- `POST /users/login` - Login (sets JWT cookie)
- `POST /users/logout` - Logout (clears cookie)
- `GET /users/details` - Get user by email
- `PUT /users/:userId` - Update user

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Cart
- `GET /cart` - Get user's cart
- `POST /cart` - Add to cart
- `PUT /cart` - Update cart item
- `DELETE /cart/:id` - Remove from cart

### Orders
- `GET /orders` - Get user's orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details

### Reviews
- `GET /reviews/:productId` - Get product reviews
- `POST /reviews` - Add review

## Code Conventions
- Use async/await for async operations
- JWT stored in httpOnly cookie
- Password hashing with bcrypt (10 rounds)
- Frontend uses axios for API calls
- Material-UI for component library

## Authentication Flow
1. User registers/logs in
2. Server creates JWT and sets it as cookie
3. Frontend sends cookies with requests (credentials: true)
4. `isAuth` middleware validates JWT on protected routes

## Common Tasks

### Adding a New Model
1. Create schema in `backend/models/`
2. Create controller in `backend/controllers/`
3. Create routes in `backend/routes/`
4. Register routes in `backend/index.js`

### Adding a New Page
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.js`
3. Add navigation link if needed
