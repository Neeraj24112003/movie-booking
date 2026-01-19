# Deployment Guide for Movie Booking System

Complete step-by-step guide to deploy your movie-booking application to production using **MongoDB Atlas** (database), **Render** (backend), and **Vercel** (frontend).

---

## Prerequisites

- [x] GitHub account with your project repository
- [x] MongoDB Atlas account ([sign up here](https://www.mongodb.com/cloud/atlas/register))
- [x] Render account ([sign up here](https://render.com))
- [x] Vercel account ([sign up here](https://vercel.com/signup))

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create Database Cluster

1. **Login to MongoDB Atlas**: Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Create a New Project** (if you haven't already):
   - Click "New Project"
   - Name it "Movie Booking"
   - Click "Create Project"

3. **Build a Database**:
   - Click "Build a Database"
   - Choose **M0 FREE** tier
   - Select a cloud provider and region (closest to your users)
   - Cluster Name: `Cluster0` (or your preference)
   - Click "Create Cluster"

### Step 2: Configure Database Access

1. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Authentication Method: **Password**
   - Username: Choose a username (e.g., `moviebooking`)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

2. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for deployment flexibility)
   - This adds `0.0.0.0/0` - suitable for cloud deployments
   - Click "Confirm"

### Step 3: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
6. **Important**: Replace:
   - `<username>` with your database username
   - `<password>` with your database password
   - Add `/moviebooking` before the `?` to specify the database name

**Final format**:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moviebooking?retryWrites=true&w=majority&appName=Cluster0
```

> [!TIP]
> Save this connection string securely - you'll need it for Render deployment.

---

## Part 2: Backend Deployment on Render

### Step 1: Prepare Your Repository

1. **Ensure your code is on GitHub**:
   ```bash
   git add .
   git commit -m "Configure for deployment"
   git push origin main
   ```

2. **Verify files exist**:
   - ✓ `server/package.json`
   - ✓ `server/index.js`
   - ✓ `server/.env.example` (created)
   - ✓ `render.yaml` (optional, for blueprint deployment)

### Step 2: Create Web Service on Render

1. **Login to Render**: Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your `movie-booking` repository

3. **Configure the Service**:
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `movie-booking-api` (or your preference) |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` (or your default branch) |
   | **Root Directory** | `server` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

4. **Add Environment Variables**:
   
   Click "Advanced" → "Add Environment Variable" and add these:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your complete MongoDB Atlas connection string |
   | `CLIENT_URL` | `https://your-app-name.vercel.app` (update after Vercel deployment) |
   | `JWT_SECRET` | Generate a random string (e.g., use [this generator](https://randomkeygen.com/)) |
   | `NODE_ENV` | `production` |

   > [!IMPORTANT]
   > **For CLIENT_URL**: Initially, you can use a placeholder like `https://movie-booking.vercel.app`. You'll update this after deploying to Vercel.

5. **Create Web Service**:
   - Click "Create Web Service"
   - Render will start building and deploying your backend
   - Wait for the deployment to complete (status: "Live")

6. **Get Your Backend URL**:
   - Your backend will be available at: `https://movie-booking-api.onrender.com`
   - Copy this URL - you'll need it for the frontend

7. **Test Your Backend**:
   - Visit: `https://your-backend-url.onrender.com/api`
   - You should see: `{"success": true, "message": "Online Movie Ticket Booking API is running..."}`

> [!WARNING]
> **Render Free Tier**: Services spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## Part 3: Frontend Deployment on Vercel

### Step 1: Update Client Environment Variables

1. **Update `client/.env`**:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with your actual Render URL

2. **Commit and push**:
   ```bash
   git add client/.env
   git commit -m "Update API URL for production"
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to client directory**:
   ```bash
   cd client
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts:
     - Setup and deploy? **Y**
     - Which scope? Choose your account
     - Link to existing project? **N**
     - What's your project's name? `movie-booking` (or your preference)
     - In which directory is your code located? `./`
     - Want to override settings? **N**

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. **Login to Vercel**: Go to [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select `movie-booking` repository

3. **Configure Project**:
   
   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Vite |
   | **Root Directory** | `client` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
   - Click "Add"

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Vercel will provide a URL like: `https://movie-booking-xyz123.vercel.app`

### Step 3: Update Backend CORS Configuration

1. **Go back to Render dashboard**
2. Navigate to your `movie-booking-api` service
3. Go to "Environment" tab
4. Update `CLIENT_URL` to your Vercel deployment URL:
   ```
   https://movie-booking-xyz123.vercel.app
   ```
5. Click "Save Changes"
6. Render will automatically redeploy with the new configuration

---

## Part 4: Verification & Testing

### Backend Health Check

1. Visit your backend URL: `https://your-backend.onrender.com/api`
2. Expected response:
   ```json
   {
     "success": true,
     "message": "Online Movie Ticket Booking API is running..."
   }
   ```

### Database Connection Check

Check Render logs:
1. Go to Render dashboard → Your service
2. Click "Logs" tab
3. Look for: `Connected to MongoDB: moviebooking`
4. If you see connection errors, verify your MongoDB URI

### Frontend Test

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test the following flows:
   - ✓ Homepage loads
   - ✓ User registration
   - ✓ User login
   - ✓ Browse movies
   - ✓ View movie details
   - ✓ (Admin) Manage movies/theaters

---

## Troubleshooting

### Issue: "Failed to connect to MongoDB"

**Possible causes**:
1. ❌ Incorrect MongoDB URI format
   - ✅ Ensure database name is included: `/moviebooking?`
   - ✅ Verify username and password are correct
   - ✅ Check for special characters in password (URL encode if needed)

2. ❌ IP address not whitelisted
   - ✅ Go to MongoDB Atlas → Network Access
   - ✅ Ensure `0.0.0.0/0` is added

3. ❌ Database user permissions
   - ✅ Go to MongoDB Atlas → Database Access
   - ✅ Verify user has "Read and write to any database" privileges

### Issue: "CORS Error" on Frontend

**Possible causes**:
1. ❌ `CLIENT_URL` not set correctly on Render
   - ✅ Check environment variable matches your Vercel URL exactly
   - ✅ No trailing slash in the URL

2. ❌ Frontend making requests to wrong backend URL
   - ✅ Check `VITE_API_URL` in Vercel environment variables
   - ✅ Verify it points to Render backend

### Issue: "API requests failing with 404"

**Check**:
1. ✅ Frontend `VITE_API_URL` includes `/api` path
2. ✅ Backend is running (check Render service status)
3. ✅ Check browser console for actual URL being called

### Issue: Render Service Won't Start

**Check Render logs**:
1. Go to Render dashboard → Your service → Logs
2. Look for error messages
3. Common issues:
   - Missing dependencies: Check `package.json`
   - Port binding: Ensure using `process.env.PORT`
   - Build failures: Verify `npm install` completes

### Issue: Changes Not Reflected After Deployment

1. **Clear Vercel cache**:
   - Redeploy with: `vercel --prod --force`

2. **Hard refresh browser**:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Check environment variables updated**:
   - Vercel: Settings → Environment Variables
   - Render: Environment tab

---

## Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.net/moviebooking?...` |
| `CLIENT_URL` | Frontend URL for CORS | `https://movie-booking.vercel.app` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32+ character string |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port (auto-set by Render) | `10000` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://movie-booking-api.onrender.com/api` |

---

## Updating After Changes

### Code Changes

1. **Make changes locally**
2. **Test locally**:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```

4. **Automatic deployments**:
   - Render will auto-deploy backend changes
   - Vercel will auto-deploy frontend changes

### Environment Variable Changes

**Render**:
1. Dashboard → Service → Environment
2. Update variable
3. Save (triggers automatic redeploy)

**Vercel**:
1. Dashboard → Project → Settings → Environment Variables
2. Update variable
3. Redeploy from Deployments tab

---

## Security Best Practices

> [!CAUTION]
> **Never commit `.env` files to Git!**

1. ✅ Ensure `.env` is in `.gitignore`
2. ✅ Use strong passwords for MongoDB
3. ✅ Generate cryptographically secure `JWT_SECRET`
4. ✅ Regularly rotate secrets
5. ✅ Use environment-specific configurations
6. ✅ Review Render/Vercel logs for suspicious activity

---

## Performance Optimization

### Backend (Render)

1. **Keep service warm** (Free tier):
   - Use a cron job service (like cron-job.org) to ping your API every 14 minutes
   - Endpoint to ping: `https://your-backend.onrender.com/api`

2. **Upgrade for production**:
   - Consider paid Render plan to avoid cold starts
   - Better performance and always-on service

### Frontend (Vercel)

1. **Already optimized**:
   - Vercel provides global CDN
   - Automatic HTTPS
   - Edge caching

---

## Support & Resources

- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

## Quick Reference Commands

```bash
# Test locally
cd server && npm run dev
cd client && npm run dev

# Deploy frontend (Vercel CLI)
cd client && vercel --prod

# View Render logs (requires Render CLI)
render logs -s movie-booking-api

# Rebuild Vercel deployment
vercel --prod --force
```

---

**🎉 Congratulations!** Your Movie Booking System is now deployed and ready for production use!
