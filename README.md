# Tours n Travel - Kenya

A complete tours and travel agency website showcasing Kenyan destinations, parks, and experiences. Built with modern frontend technologies and a robust backend API.

## 🌍 About

Tours n Travel Kenya is a comprehensive travel platform featuring:
- 12 Kenyan national parks and reserves
- Gallery pages for different destination categories
- User authentication and booking system
- Responsive design for all devices
- Modern video homepage showcasing Kenyan features

## ✨ Features

### Frontend
- **Responsive Design**: Works seamlessly on laptops, tablets, iPads, and smartphones
- **Video Homepage**: Dynamic video slider showcasing 5 Kenyan features (Wildebeest Migration, Mount Kenya, Coastal Beaches, Big Five Safari, Maasai Culture)
- **Package Showcase**: 12 Kenyan tour packages with detailed information
- **Gallery Pages**: 6 category pages with specific locations and tips
- **Search Functionality**: Real-time search across packages, services, and gallery
- **User Authentication**: Login and register forms with backend integration
- **Up-to-Top Button**: Easy navigation for long pages
- **Review System**: Customer testimonials with Kenyan travel experiences

### Backend
- **RESTful API**: Complete Node.js/Express API
- **MongoDB Database**: Mongoose ODM for data management
- **JWT Authentication**: Secure user authentication
- **Package Management**: CRUD operations for tour packages
- **Booking System**: Tour booking functionality
- **Review System**: User reviews with approval workflow
- **Contact Form**: Handle contact messages
- **Role-Based Access**: Admin and user roles

## 🚀 Tech Stack

### Frontend
- HTML5
- CSS3 (Custom styling with CSS variables)
- JavaScript (ES6+)
- Swiper.js (Carousel/slider library)
- Font Awesome (Icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS for cross-origin resource sharing

## 📁 Project Structure

```
Tours n Travel project/
├── backend/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── seed.js         # Database seeding
│   ├── middleware/
│   │   ├── auth.js         # Authentication middleware
│   │   └── errorHandler.js # Error handling
│   ├── models/
│   │   ├── Booking.js      # Booking model
│   │   ├── Contact.js      # Contact model
│   │   ├── Package.js      # Package model
│   │   ├── Review.js       # Review model
│   │   └── User.js         # User model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── bookings.js     # Booking routes
│   │   ├── contact.js      # Contact routes
│   │   ├── packages.js     # Package routes
│   │   └── reviews.js      # Review routes
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── .gitignore          # Git ignore file
├── gallery/
│   ├── birdwatching.html   # Bird watching destinations
│   ├── sandybeaches.html   # Sandy beaches destinations
│   ├── historicalsites.html # Historical sites & caves
│   ├── museum.html         # Museums
│   ├── climbingkenya.html  # Mount Kenya climbing
│   ├── migration.html      # Wildebeest migration
│   └── gallery-detail.css  # Gallery pages styling
├── images/                 # All project images
├── index.html             # Main homepage
├── style.css              # Main stylesheet
├── script.js              # Frontend JavaScript
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🏛️ Kenyan Destinations

### National Parks & Reserves
1. Aberdare National Park
2. Amboseli National Park
3. Lake Nakuru National Park
4. Marsabit National Park
5. Maasai Mara Game Reserve
6. Meru National Park
7. Mt. Kenya National Park
8. Nairobi National Park
9. Samburu National Reserve
10. Sibiloi National Park
11. Tsavo East National Park
12. Tsavo West National Park

### Gallery Categories
- Bird Watching Sites
- Sandy Beaches
- Historical Sites & Caves
- Museums
- Climbing Mt. Kenya
- Wildebeest Migration

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Git

### Frontend Setup
1. Clone the repository:
```bash
git clone https://github.com/Mikelly-Mikey/Tours_n_Travels_Ke.git
cd "Tours n Travel project"
```

2. Open `index.html` in a web browser

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and other configurations

5. Start MongoDB server

6. Seed the database:
```bash
node config/seed.js
```

7. Start the server:
```bash
npm start
```

The backend API will run on `http://localhost:5000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Packages
- `GET /api/packages` - Get all packages (supports search)
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Create package (Admin)
- `PUT /api/packages/:id` - Update package (Admin)
- `DELETE /api/packages/:id` - Delete package (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings (User/Admin)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status (Admin)
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Approve review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin)

## 🎨 Features Highlights

### Responsive Video Homepage
- Videos automatically resize for different screen sizes
- Supports laptops, tablets, iPads, and smartphones
- Smooth transitions between video clips

### Modern Login/Register Forms
- Gradient background with shadow effects
- Form validation
- Backend API integration
- Secure JWT token storage

### Search Functionality
- Real-time search with debounce
- Backend API integration for packages
- Frontend filtering for services and gallery
- Minimum 2 characters required

### Up-to-Top Button
- Appears after scrolling 300px
- Smooth scroll animation
- Hover effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Mikelly-Mikey - Project Developer

## 📞 Contact

For inquiries, please use the contact form on the website or open an issue on GitHub.

## 🙏 Acknowledgments

- Font Awesome for icons
- Swiper.js for carousel functionality
- All image contributors
- Kenyan tourism resources

---

**Explore Kenya with Tours n Travel! 🇰🇪**
