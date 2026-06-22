# Premium MERN Stack Developer Portfolio

A modern, highly interactive, and responsive full-stack developer portfolio. Built using a **React + Vite** frontend, a **Node.js + Express** backend API, and a live **MongoDB Atlas** database.

The application includes a secure **Admin Dashboard Console** (`/admin`) for viewing contact inbox submissions, modifying projects list data, and updating career experiences timeline in real time.

---

## Key Features

1. **Rich Aesthetics**: Custom fluid mouse cursor tracker, floating ambient orbs, smooth grid hover animations, and an interactive CLI terminal experience widget.
2. **Dynamic Data Hydration**: Custom projects and experience items are fetched directly from MongoDB, rendering instantly with zero layout shift.
3. **Database Fallback Safety**: If the MongoDB database is disconnected, the server runs gracefully on port 5000 and falls back to logging contact inquiries to the console, while the client falls back to rendering default mock arrays.
4. **Secure Admin Console (`/admin`)**: Fully functional CRUD panel protected by JSON Web Tokens (JWT) for secure authentication.
5. **Vite Reverse Proxy**: Integrated local backend proxies preventing CORS conflicts during development.

---

## Codebase Structure

```
myportfolio/
├── package.json               # Root manager package (concurrent operations)
├── .gitignore                 # Excludes node_modules and .env credentials
├── client/                    # React + Vite Frontend Workspace
│   ├── package.json
│   ├── vite.config.js         # Port proxies
│   ├── index.html             # Typographies and viewport
│   └── src/
│       ├── main.jsx           # React app mount
│       ├── App.jsx            # App router (/ and /admin)
│       ├── index.css          # Design system & Admin UI styles
│       ├── components/        # Frontend layout components
│       └── pages/             # Route pages (Portfolio & AdminDashboard)
└── server/                    # Node.js + Express Backend Workspace
    ├── package.json           # Server dependencies (mongoose, jwt, bcryptjs)
    ├── server.js              # Server entry point
    ├── .env                   # Environment variable credentials (ignored by git)
    ├── models/                # Mongoose Database Schemas
    ├── routes/                # Backend API routers
    └── scripts/
        └── seed.js            # MongoDB Database seeding utility
```

---

## Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **MongoDB**: A running local MongoDB instance OR a MongoDB Atlas cluster URL.

---

## Installation & Setup

### 1. Clone & Install Dependencies
Install all root, client, and server dependencies concurrently by running the following command in the root folder:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Create a `.env` file inside the `server/` directory:
```bash
# File: server/.env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.t80wiyg.mongodb.net/portfolio?appName=Cluster0
JWT_SECRET=supersecretportfoliojwtkey12345
```
> [!WARNING]
> Keep your `.env` files local. Do not commit or push them to GitHub. The root `.gitignore` is pre-configured to block them.

### 3. Seed the Database
Run the seeding script to populate your database with initial project details, boutique Lahore experiences, and configure your default administrator account:
```bash
npm run seed
```
* **Default Admin Credentials** (Seeded by default):
  * **Username**: `admin`
  * **Password**: `[Refer to your server/scripts/seed.js file for configuration]`

---

## Running the Application

To start both the client server and backend server concurrently in development mode:
```bash
npm run dev
```

* **Frontend Site**: [http://localhost:5173](http://localhost:5173) (or `http://localhost:5174`)
* **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)
* **Backend API Gateway**: [http://localhost:5000/api](http://localhost:5000/api)

---

## Deployment Guide (Production)

This app is configured for single-unit full-stack hosting (e.g. Render, Railway, or Heroku). 

In production, the backend Node app is configured to host the static compiled React code from `client/dist`.

### Steps to Deploy on Render:
1. Connect your repository to Render.
2. Select **Web Service** and choose **Node** runtime.
3. Configure the **Build Command** to build both workspaces:
   ```bash
   npm install --legacy-peer-deps && npm run build
   ```
4. Configure the **Start Command**:
   ```bash
   npm run server
   ```
5. Add your Environment Variables in the Render Settings panel:
   * `MONGODB_URI` = `your_mongodb_connection_url`
   * `JWT_SECRET` = `your_secret_key`
   * `NODE_ENV` = `production`

### Steps to Deploy Frontend on Vercel:
Vercel is designed for static hosting. Because the frontend code is in a subfolder (`client`), you must configure the root directory in the Vercel dashboard so that it installs the correct dependencies (like `vite`) before building:

1. Import your repository into Vercel.
2. In the project setup panel, look for **Root Directory** (right below the Project Name).
3. Click **Edit** and choose the `client` folder.
4. Under **Build and Development Settings**, make sure:
   * **Framework Preset** is set to `Vite`.
   * **Build Command** is set to `npm run build` (or left default).
   * **Output Directory** is set to `dist` (or left default).
5. Click **Deploy**. Vercel will now run `npm install` inside the `client` folder, install `vite` successfully, and build the static files.

