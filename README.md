# 🎬 Online Movie Ticket Booking System (MERN)

A premium, full-featured Movie Ticket Booking System built with the MERN stack (MongoDB, Express, React, Node.js). Features include JWT authentication, interactive seat selection, movie listing, and a user profile for ticket management.

---

## 🚀 Features

- 🔐 **Secure Auth**: Register, Login, and Logout with JWT stored in HTTP-only cookies.
- 🎭 **Movie Browsing**: Dynamic movie listing with genre filters and detailed views.
- 💺 **Interactive Seat Selector**: Premium grid-based seat selection with real-time status.
- 🎟 **Booking History**: Track your tickets in a personalized dashboard.
- 👑 **Admin Console**: Dashboard for movie and theater management statistics.
- 📱 **Responsive Design**: Fully mobile-responsive UI using Tailwind CSS.

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a MongoDB Atlas URI)

---

## 📥 Installation

### 1. Clone or Open the Project
Open your terminal (or Command Prompt/PowerShell on Windows) and navigate to the project root:
```bash
cd online-movie-ticket
```

### 2. Setup Server
```bash
cd server
npm install
```

### 3. Setup Client
```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

1. Go to the `server` directory.
2. The project already contains a `.env` file. If you are using a remote MongoDB instance, update the `MONGODB_URI`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/online-movie-ticket
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
```

---

## 🍿 Running the Application

### 🧪 Step 0: Seed the Database (Important)
To populate the database with initial movies, theaters, and shows, run this command in the `server` directory:
```bash
# Terminal (Linux/Mac/Windows)
node seed.js
```

### 🖥️ Back-end (Server)
In the `server` directory:
```bash
# For development (auto-restart)
npm run dev

# Normal start
npm start
```

### 🌐 Front-end (Client)
In a **new terminal** window, go to the `client` directory:
```bash
npm run dev
```
The app will be available at: `http://localhost:5173`

---

## 💻 Platform Specific Commands

### 🐧 Linux / macOS
If you face permission issues while installing dependencies:
```bash
sudo npm install
```
To run the server and client concurrently (optional if `concurrently` is installed):
```bash
cd ..
npm start
```

### 🪟 Windows
Use **PowerShell** or **Command Prompt** (Run as Administrator if needed).
If `nodemon` or `vite` is not recognized, try:
```powershell
npx nodemon index.js  # for server
npx vite              # for client
```

---

## 🏗️ Implementation Phases (How it was built)

1. **Initialization**: Scaffolding `client` (Vite) and `server` (Express) folders.
2. **Database Modeling**: Creating Mongoose schemas for Users, Movies, Theaters, Shows, and Bookings.
3. **Auth Implementation**: Setting up Bcrypt for password hashing and JWT for session management.
4. **Backend API**: Building RESTful endpoints for movie retrieval, seat availability checks, and booking creation.
5. **Frontend Core**: Configuring Redux Toolkit for global user state.
6. **UI/UX**: Implementing Tailwind CSS for a dark, premium cinematic theme.
7. **Seat Logic**: Developing the interactive grid and atomic booking logic to prevent double bookings.
8. **Verification**: E2E testing using automated browser agents to ensure a seamless flow.

---

## 📜 License
This project is open-source. Feel free to use and modify it!
