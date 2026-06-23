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
