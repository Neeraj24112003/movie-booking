# 🎬 Movie Booking System - MERN Stack

A full-featured, production-ready **Online Movie Ticket Booking System** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This application provides a complete movie booking experience with user authentication, interactive seat selection, booking management, and admin capabilities.

![Home Page](file:///home/neeraj/.gemini/antigravity/brain/d9384fc5-1252-4db7-afda-b211bbbbcba2/home_page_1767669979167.png)

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login with JWT authentication
- Password hashing using bcrypt
- HTTP-only cookie-based session management
- Protected routes for authenticated users

### 🎭 Movie Management
- Browse available movies with detailed information
- View movie details including genre, language, duration, and description
- Filter movies by genre and search functionality
- Dynamic movie listings with real-time availability

### 💺 Interactive Seat Selection
- Premium grid-based seat selection interface
- Real-time seat availability status (Available, Booked, Selected)
- Multiple seat categories (Classic, Prime, Premium) with different pricing
- Visual feedback for seat selection

![Seat Selection](file:///home/neeraj/.gemini/antigravity/brain/d9384fc5-1252-4db7-afda-b211bbbbcba2/seat_selection_page_1767670556888.png)

### 🎟️ Booking System
- Complete booking flow from movie selection to confirmation
- Show time selection with theater information
- Booking history and management
- Wallet system for payments

![User Dashboard](file:///home/neeraj/.gemini/antigravity/brain/d9384fc5-1252-4db7-afda-b211bbbbcba2/final_booking_dashboard_1767670699306.png)

### 📱 Responsive Design
- Fully responsive UI built with Tailwind CSS
- Modern, cinematic dark theme
- Mobile-friendly interface
- Smooth animations and transitions

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie parsing middleware
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **SweetAlert2** - Beautiful alerts
- **Moment.js** - Date/time formatting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher recommended)
  - Check version: `node --version`
  - Download: [https://nodejs.org/](https://nodejs.org/)
  
- **npm** (comes with Node.js)
  - Check version: `npm --version`
  
- **MongoDB** (v4.x or higher)
  - Check if running: `systemctl is-active mongod` (Linux)
  - Download: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
  - Start MongoDB: `sudo systemctl start mongod` (Linux)

---

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd /home/neeraj/Documents/movie-booking
```

### 2. Install Server Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Install Client Dependencies

```bash
cd client
npm install
cd ..
```

> **Note:** You may see warnings about unsupported engine versions. The application will still work with Node.js v18.x, though v20+ is recommended.

---

## ⚙️ Configuration

### Server Configuration

The server uses environment variables defined in `server/.env`:

```env
PORT=8082
MONGODB_URI=mongodb://localhost:27017/online-movie-ticket
JWT_SECRET=your_super_secret_jwt_key_12345
```

> **Important:** For production, change the `JWT_SECRET` to a strong, random string.

### Database Setup

The project includes a seed script to populate the database with sample data:

```bash
cd server
FORCE_SEED=true node seed.js
```

This will create:
- Sample movies (Avatar: The Way of Water, Oppenheimer, etc.)
- Theaters with multiple screens
- Show times for the next 7 days
- Admin user account

---

## 🎬 Running the Application

You need to run **both** the server and client simultaneously in separate terminal windows.

### Terminal 1: Start the Backend Server

```bash
cd server
npm start
```

Expected output:
```
Server is running on port 8082
Connected to MongoDB: online-movie-ticket
```

### Terminal 2: Start the Frontend Client

```bash
cd client
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in 346 ms
➜  Local:   http://localhost:5173/
```

> **Note:** If you encounter a "Permission denied" error for vite, run:
> ```bash
> chmod +x node_modules/.bin/vite
> npm run dev
> ```

### Access the Application

Open your browser and navigate to:
**http://localhost:5173**

---

## 👤 User Accounts

### Test User Account
You can register a new account or use existing test accounts:

- **Email:** test@example.com
- **Password:** test123

### Admin Account
(If created via seed script or create-admin.js)

- **Email:** admin@example.com
- **Password:** admin123

---

## 🧪 Testing Results

The application has been thoroughly tested with the following results:

### ✅ Successful Tests

1. **User Registration**
   - ✓ New user registration with email validation
   - ✓ Password hashing and secure storage
   - ✓ Duplicate email prevention

2. **User Authentication**
   - ✓ Login with valid credentials
   - ✓ JWT token generation and storage
   - ✓ Session persistence across page refreshes
   - ✓ Protected route access

3. **Movie Browsing**
   - ✓ Movie listing display
   - ✓ Movie details page
   - ✓ Genre and language information
   - ✓ Show time selection

4. **Seat Selection**
   - ✓ Interactive seat grid display
   - ✓ Seat availability status (Available/Booked/Selected)
   - ✓ Multiple seat selection
   - ✓ Seat category pricing (Classic/Prime/Premium)
   - ✓ Real-time seat status updates

5. **Booking Process**
   - ✓ Complete booking flow
   - ✓ Booking confirmation
   - ✓ Booking history display
   - ✓ User dashboard with booking details

### 📊 Test Coverage

- **Backend API Endpoints:** All tested and functional
- **Frontend Components:** All major components tested
- **User Flows:** Complete end-to-end testing performed
- **Browser Compatibility:** Tested on modern browsers

### 🎥 Test Recording

A complete test recording demonstrating all features is available:
[View Test Recording](file:///home/neeraj/.gemini/antigravity/brain/d9384fc5-1252-4db7-afda-b211bbbbcba2/movie_booking_test_1767669968902.webp)

---

## 🗂️ Project Structure

```
movie-booking/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json       # Client dependencies
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   ├── seed.js           # Database seed script
│   └── package.json      # Server dependencies
│
├── README.md             # This file
├── INSTRUCTIONS.md       # Setup instructions
└── package.json          # Root package.json
```

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
systemctl is-active mongod

# If not running, start it
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::8082`

**Solution:**
```bash
# Find process using port 8082
lsof -i :8082

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use a different port by modifying server/.env
```

### Vite Permission Denied

**Problem:** `sh: 1: vite: Permission denied`

**Solution:**
```bash
cd client
chmod +x node_modules/.bin/vite
npm run dev
```

### React State Not Updating

**Problem:** Form inputs not registering changes

**Solution:** This is typically handled automatically, but if you encounter issues, ensure you're using the latest version of React and that input fields have proper `onChange` handlers.

### Database Seed Errors

**Problem:** `ERROR: Seeding overrides existing data!`

**Solution:**
```bash
# Force seed to reset the database
cd server
FORCE_SEED=true node seed.js
```

### CORS Errors

**Problem:** Cross-origin request blocked

**Solution:** Ensure the server is running and CORS is properly configured in `server/index.js`. The server should allow requests from `http://localhost:5173`.

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get show by ID
- `GET /api/shows/movie/:movieId` - Get shows by movie

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID

### Theaters
- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/:id` - Get theater by ID

---

## 🚀 Deployment

### Production Build

To create a production build:

```bash
# Build the client
cd client
npm run build

# The build files will be in client/dist
```

### Environment Variables for Production

Update `server/.env` for production:

```env
NODE_ENV=production
PORT=8082
MONGODB_URI=mongodb://your-production-db-uri
JWT_SECRET=your-very-secure-random-secret-key
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available for educational and commercial use.

---

## 👨‍💻 Development

### Development Mode

For development with hot-reload:

```bash
# Server (with nodemon)
cd server
npm run dev

# Client (with Vite HMR)
cd client
npm run dev
```

### Code Quality

The project includes ESLint configuration for code quality:

```bash
cd client
npm run lint
```

---

## 🎯 Future Enhancements

Potential features for future development:

- [ ] Payment gateway integration
- [ ] Email notifications for bookings
- [ ] QR code generation for tickets
- [ ] Movie reviews and ratings
- [ ] Advanced search and filters
- [ ] Admin analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Loyalty rewards program

---

## 📞 Support

For issues, questions, or suggestions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review existing issues in the repository
3. Create a new issue with detailed information

---

## 🙏 Acknowledgments

- Built with the MERN stack
- UI components styled with Tailwind CSS
- Icons from Lucide React
- Alerts powered by SweetAlert2

---

**Made with ❤️ using the MERN Stack**
