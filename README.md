# MyWoods — Timber Inventory CMS & Marketing Platform

MyWoods is a fully-featured MERN stack (MongoDB, Express, React, Node.js) web application designed for managing wood inventory data through a custom CMS panel, paired with elegant public-facing marketing pages.

## Project Structure

```text
mywoods.website/
├── backend/                  # Node.js + Express API server
│   ├── models/               # Mongoose Schemas (Wood, ContactMessage)
│   ├── routes/               # API endpoints (woods, contact)
│   ├── scripts/              # Database seeding script (seed.js)
│   ├── package.json          # Backend dependencies & script definitions
│   └── server.js             # Main server entry point & DB connector
│
├── frontend/                 # React + Vite client app (Tailwind CSS v3)
│   ├── public/               # Static assets (team_at_work.png)
│   ├── src/
│   │   ├── components/       # Reusable components (Navbar, Footer, WoodModal)
│   │   ├── pages/            # View components (Home, About, CMS, Woods, Contact)
│   │   ├── api.js            # Axios client config with ENV variables
│   │   ├── App.jsx           # React Router config
│   │   ├── index.css         # Global Tailwind directives
│   │   └── main.jsx          # React app entry point
│   ├── package.json          # Frontend dependencies & configurations
│   ├── tailwind.config.js    # Tailwind color palette & typography themes
│   └── vite.config.js        # Vite port configurations
│
└── README.md                 # Complete documentation
```

---

## 1. Local Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`

### Quick Start (From Project Root)
To install dependencies and start both the backend and frontend simultaneously with a single command from the project root directory:

1. Install root, backend, and frontend packages:
   ```bash
   npm run install-all && npm install
   ```
2. Start both dev servers concurrently:
   ```bash
   npm run dev
   ```
   *This starts the backend at `http://localhost:5000` and frontend at `http://localhost:5173` concurrently.*

---

### Step 1: Set up the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory (you can copy `.env.example`):
   ```ini
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/mywoods
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server (includes auto-seeding if your database is empty):
   ```bash
   npm run dev
   ```
   *The server runs at `http://localhost:5000`.*
5. *(Optional)* Run the standalone seed script manually to reset data:
   ```bash
   npm run seed
   ```

### Step 2: Set up the Frontend
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be served at `http://localhost:5173`.*

---

## 2. MongoDB Atlas Configuration (Production Database)

To run the application with a cloud database or prepare for Render deployment:

1. Sign up/Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **Free Tier (M0 Shared)** cluster.
3. In **Database Access**, create a user (choose password authentication) and save the username/password.
4. In **Network Access**, click **Add IP Address** and choose **Allow Access From Anywhere** (`0.0.0.0/0`) for hosting deployment.
5. In your Cluster Dashboard, click **Connect** -> **Drivers** (Node.js). Copy the connection string.
6. Replace `<password>` with your user password and set the database name at the end (e.g. `...mongodb.net/mywoods?retryWrites=true...`).
7. Save this connection string as your `MONGO_URI` environment variable.

---

## 3. Deployment on Render

This project is configured to run as two separate Render services.

### A. Backend Deployment (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New** -> **Web Service**.
2. Connect your GitHub repository containing the project.
3. Set the following settings:
   - **Name**: `mywoods-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (or `npm start`)
4. Add the following **Environment Variables**:
   - `MONGO_URI`: *Your MongoDB Atlas connection string*
   - `PORT`: `10000` (or leave default, Render maps this automatically)
   - `CLIENT_URL`: *URL of your deployed frontend (e.g. `https://mywoods.onrender.com`)*
5. Click **Deploy Web Service** and copy the generated Service URL (e.g., `https://mywoods-backend.onrender.com`).

### B. Frontend Deployment (Static Site)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New** -> **Static Site**.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Name**: `mywoods` (or any name you prefer)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variables**:
   - `VITE_API_URL`: *The URL of your deployed backend Web Service (e.g., `https://mywoods-backend.onrender.com`)*
5. Configure **Redirects/Rewrites** to support React Router single-page navigation:
   - In the settings of your Static Site, go to the **Redirects/Rewrites** tab.
   - Click **Add Rule**.
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite` (This ensures page refreshes don't return 404s).
6. Click **Deploy Static Site**.

---

## 4. REST API Endpoint Catalog

- **Woods Inventory API**:
  - `GET /api/woods` - List all wood records (sorted newest first)
  - `POST /api/woods` - Create a new wood entry (returns `201 Created`)
  - `GET /api/woods/:id` - Fetch single wood entry details
  - `PUT /api/woods/:id` - Edit/modify wood entry attributes
  - `DELETE /api/woods/:id` - Erase a wood entry from database
- **Contact API**:
  - `POST /api/contact` - Submits a contact inquiry form
  - `GET /api/contact` - Fetch list of submitted customer questions
