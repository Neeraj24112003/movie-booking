
# 🚀 How to Run "Online Movie Ticket System" From Scratch

Follow these steps exactly to start the application.

## 🛠️ Step 1: Install Dependencies (Do this once)
You need to install the libraries for both the **Backend** (Server) and **Frontend** (Client).

1.  **Open a Terminal** (Command Prompt or PowerShell).
2.  Navigate to the project folder:
    ```bash
    cd "c:\Users\M SAI KIRAN REDDY\Downloads\movie-booking"
    ```
3.  **Install Server Dependencies**:
    ```bash
    cd server
    npm install
    cd ..
    ```
4.  **Install Client Dependencies**:
    ```bash
    cd client
    npm install
    cd ..
    ```

---

## 🏗️ Step 2: Setup Database & Admin (Do this once)
This prepares your database with sample movies and creates the Admin user.

1.  **Open Terminal** in the `server` folder:
    ```bash
    cd server
    ```
2.  **Run the Seed Script** (Safely):
    ```bash
    # Windows PowerShell
    $env:FORCE_SEED="true"; node seed.js
    
    # Command Prompt (cmd)
    set FORCE_SEED=true && node seed.js
    ```
    *This creates Movies, Theaters, and one Admin User.*

3.  **Create Admin User** (If seed didn't cover it):
    ```bash
    node create-admin.js
    ```
    *Credentials: `admin@example.com` / `admin123`*

---

## 🟢 Step 3: Run the Application (Every time)
You need **TWO** SEPARATE terminals running at the same time.

### 🖥️ Terminal 1: START THE SERVER
1.  Open a Terminal.
2.  Go to the server folder:
    ```bash
    cd "c:\Users\M SAI KIRAN REDDY\Downloads\movie-booking\server"
    ```
3.  Start the backend:
    ```bash
    npm start
    ```
    *Success Message: "Server is running on port 8082" and "MongoDB Connected".*

### 🌐 Terminal 2: START THE CLIENT
1.  Open a **NEW** Terminal.
2.  Go to the client folder:
    ```bash
    cd "c:\Users\M SAI KIRAN REDDY\Downloads\movie-booking\client"
    ```
3.  Start the frontend:
    ```bash
    npm run dev
    ```
    *Success Message: "Local: http://localhost:5173/"*

---

## 🌍 Step 4: Open in Browser
Go to your browser (Chrome/Edge) and visit:
👉 **http://localhost:5173**

### Login Details:
- **Admin**: `admin@example.com` / `admin123`
- **User**: Register a new account or use `sai@gmail.com` / `sai123` (if created path).

---

## ❓ Troubleshooting
- **"Network Error"**: Make sure Terminal 1 (Server) is running.
- **"Blank Screen"**: Check Console (F12) for errors.
- **"Port In Use"**: If port 8082 is busy, find what's using it or restart your computer.
