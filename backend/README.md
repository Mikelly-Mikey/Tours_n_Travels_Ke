# Tours and Travel - Backend API

A complete backend API for the Tours and Travel Agency project built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, login, and profile management with JWT
- **Package Management**: CRUD operations for tour packages
- **Booking System**: Create and manage tour bookings
- **Review System**: User reviews with approval workflow
- **Contact Form**: Handle contact messages
- **Role-Based Access Control**: Admin and user roles
- **Security**: Helmet, CORS, rate limiting, password hashing

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory and copy the contents from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in the `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tours-travel-db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**Important**: Generate a secure random string for `JWT_SECRET` in production. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/update` - Update user profile (protected)

### Packages

- `GET /api/packages` - Get all packages (supports query params: featured, available, location)
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings (admin) or user bookings (user)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status (admin only)
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews

- `GET /api/reviews` - Get all reviews (supports query params: package, approved)
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `PUT /api/reviews/:id/approve` - Approve review (admin only)
- `DELETE /api/reviews/:id` - Delete review

### Contact

- `GET /api/contact` - Get all contact messages (admin only)
- `GET /api/contact/:id` - Get single message (admin only)
- `POST /api/contact` - Send contact message
- `PUT /api/contact/:id` - Update message status (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## Authentication

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### User
- name, email, password, phone, role (user/admin)

### Package
- name, location, description, price, originalPrice, duration, image, images, rating, reviewCount, featured, available, maxGuests, amenities, itinerary

### Booking
- user, package, packageName, location, numberOfGuests, arrivalDate, departureDate, totalPrice, status, paymentStatus, specialRequests, contactPhone, contactEmail

### Review
- user, userName, package, rating, comment, approved

### Contact
- name, email, phone, subject, message, status

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- CORS enabled
- Input validation with express-validator

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── middleware/
│   ├── auth.js            # Authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── models/
│   ├── User.js
│   ├── Package.js
│   ├── Booking.js
│   ├── Review.js
│   └── Contact.js
├── routes/
│   ├── auth.js
│   ├── packages.js
│   ├── bookings.js
│   ├── reviews.js
│   └── contact.js
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main server file
```

## Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Generate a strong JWT_SECRET
4. Ensure your MongoDB connection string uses SSL
5. Set appropriate CORS origins

## License

ISC
