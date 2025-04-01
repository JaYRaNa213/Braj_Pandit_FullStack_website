# Religious Website

This repository contains the full-stack implementation of a **Religious Website**, which includes both **Frontend** and **Backend** components. 

## Features

- **User Authentication**: Register, Login, and Role-based Access Control.
- **Booking System**: Users can book Pandits, Puja, and other services.
- **Payment Integration**: Secure payment processing for religious products and services.
- **Blogs and Articles**: Religious blogs and updates.
- **Live Bhajan & Puja**: Users can participate in online religious activities.
- **E-commerce Store**: Selling religious books, idols, and other items.
- **Multi-language Support**: Users can choose their preferred language.

## Project Structure

### 📂 Full Stack Project Directory Structure
```
📂 Religious Website Repository
│
├── 📂 frontend (React)
│   ├── .env
│   ├── package.json
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── config
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── store
│   │   ├── utils
│   │   └── App.js
│   ├── public
│   └── README.md
│
├── 📂 backend (Node.js, Express, MongoDB)
│   ├── .env
│   ├── package.json
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── validations
│   │   ├── views
│   │   ├── server.js
│   ├── uploads
│   └── README.md
```

## Getting Started

### 1️⃣ Backend Setup
#### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

#### Installation & Running
```bash
cd backend
npm install
npm run dev
```

### 2️⃣ Frontend Setup
#### Prerequisites
- Node.js (v14+)
- React.js

#### Installation & Running
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Both the **Frontend** and **Backend** require `.env` files.

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_API_KEY=your_payment_gateway_key
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:7000/api
REACT_APP_PAYMENT_KEY=your_payment_gateway_key
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Booking
- `POST /api/booking` - Create a new booking
- `GET /api/booking` - Get all bookings

### Payment
- `POST /api/payment/initiate` - Initiate payment

## Contributing
Feel free to contribute to this project by submitting a Pull Request.

## License
This project is licensed under the MIT License.

---

💡 **Now you can deploy your project and start using the features!** 🚀
