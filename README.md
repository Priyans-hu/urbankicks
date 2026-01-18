# UrbanKicks - Shoes E-commerce App

UrbanKicks is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed for the online purchase of shoes. It provides a user-friendly interface for customers to browse through a variety of shoe options, view details, and make secure purchases.

## Features

- **Browse Shoe Collection** - Explore a diverse collection of shoes with images, descriptions, and prices
- **User Authentication** - Secure JWT-based authentication with account management
- **Shopping Cart** - Add, update, and manage items before checkout
- **Order Management** - Place orders and track order history
- **Product Reviews** - Read and write reviews for products

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Material-UI, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT + bcrypt |

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL
npm install
npm start
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_PATH` | MongoDB connection string | `mongodb://localhost:27017/urbankicks` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `PORT` | Server port | `8080` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BASE_URL` | Backend API URL | `http://localhost:8080` |

## API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login user |
| POST | `/users/logout` | Logout user |
| GET | `/users/details` | Get user details |
| PUT | `/users/:userId` | Update user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get user's cart |
| POST | `/cart` | Add item to cart |
| PUT | `/cart` | Update cart item |
| DELETE | `/cart/:id` | Remove item |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get user's orders |
| POST | `/orders` | Create order |
| GET | `/orders/:id` | Get order details |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews/:productId` | Get product reviews |
| POST | `/reviews` | Add review |

## Project Structure

```
urbankicks/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── .env.example      # Environment template
│   └── index.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app
│   ├── .env.example      # Environment template
│   └── package.json
├── .github/
│   └── workflows/        # CI/CD pipelines
├── CLAUDE.md             # AI assistant guide
└── README.md
```

## Development

### Running Tests
```bash
# Frontend tests
cd frontend && npm test
```

### Linting
```bash
# Backend
cd backend && npm run lint

# Frontend (via CRA)
cd frontend && npm run lint
```

## Deployment

### Backend
The backend can be deployed to services like Render, Railway, or Heroku.

### Frontend
The frontend can be deployed to Netlify, Vercel, or any static hosting.

**Live Demo:**
- Frontend: https://urbankicks.netlify.app
- Backend: https://urbankicksatserver.onrender.com

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy shopping with UrbanKicks!
