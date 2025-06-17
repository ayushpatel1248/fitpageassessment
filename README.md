# 🛍️ Product Review Web App

This is a full-stack web application where users can browse products and post reviews with ratings, text, and optional images. It’s built using modern technologies with clean architecture and is deployed on **Render** (backend + PostgreSQL) and **Vercel** (frontend).

---

## ⚙️ Tech Stack

| Layer       | Technologies Used                  |
|------------|-------------------------------------|
| Frontend   | React.js, Tailwind CSS, Vercel      |
| Backend    | Node.js, Express.js (MVC), Render   |
| Database   | PostgreSQL (Render hosted)          |
| Versioning | Git + GitHub                        |

---

## 🔥 Features

- ⭐ Rate products (1 to 5 stars)
- 📝 Write reviews with optional image
- 🖼️ Upload image in base64
- 📦 View products with prices
- 🔄 Auto-refresh reviews on submit

---

## 🚀 Live Deployment

| Layer     | URL                                                                  |
|-----------|----------------------------------------------------------------------|
| Frontend  | [View App on Vercel]           |
| Backend   | [Render API](https://fitpage-backend.onrender.com) |
| Database  | PostgreSQL hosted on Render                                          |

---

## 📁 Folder Structure

fitpageassessment/
├── backend/ # Node.js backend (MVC)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── index.js
│
└── frontend/ # React frontend
├── src/
└── public/

npm
Copy
Edit

---

## 🛠️ How to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ayushpatel1248/fitpageassessment.git
cd fitpageassessment
2️⃣ Set Up PostgreSQL on Render
✅ We use PostgreSQL hosted on Render.

Database Credentials:

env
Copy
Edit
DB_HOST='dpg-d18peh2li9vc73frb91g-a.singapore-postgres.render.com'
DB_PORT='5432'
DB_NAME='fitpage'
DB_USER='fitpage_user'
DB_PASS='MhXdYflPROFWlpjI1lxeCKAuPKPrlHwG'
These are already configured in your backend .env file (or directly in the db config).

3️⃣ Backend Setup (Node.js + Express)
bash
Copy
Edit
cd backend
npm install
Ensure your DB config file (models/db.js) uses:

js
Copy
Edit
const { Pool } = require("pg");

const pool = new Pool({
  user: "fitpage_user",
  host: "dpg-d18peh2li9vc73frb91g-a.singapore-postgres.render.com",
  database: "fitpage",
  password: "MhXdYflPROFWlpjI1lxeCKAuPKPrlHwG",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
Start the backend server:

bash
Copy
Edit
node index.js
Backend runs on http://localhost:9999

4️⃣ Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:3000

🧾 PostgreSQL Schema
Run this once in your Render-hosted PostgreSQL DB:

📡 API Endpoints
Method	Endpoint	Description
POST	/reviews	Submit a new review
POST	/reviews/get	Get all reviews for a product

🧱 Architecture (Backend)
The backend uses MVC structure:

