# 🐝 BeeHive Tracker API

A fullstack project to help beekeepers track hive placements, flowering crops, and find crop opportunities based on geolocation and flowering windows.

---

## 📁 Project Structure

. ├── backend/ # Node.js API server (Express + MongoDB + JWT Auth) │ ├── Dockerfile │ └── .env ├── frontend/ # Frontend (React / Next.js) │ ├── Dockerfile │ └── .env (if needed) ├── docker-compose.yml # Container orchestration └── README.md

yaml
Copy
Edit

---

## 🚀 Features

- Add / Get Hive Logs
- Add / Get Nearby Crop Calendar Entries
- JWT Authentication (Admin & Beekeeper)
- MongoDB as database
- Dockerized setup with Compose
- Bonus: Export logs, Swagger docs (optional)

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB (Docker)
- JWT Authentication
- Docker + Docker Compose
- React / Next.js (Frontend)

---

## 📦 Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://admin:admin123@mongodb:27017/beehive_dev?authSource=admin
JWT_SECRET=your_super_secret_jwt
▶️ Running the Project
🔸 Option 1: Using Docker Compose (Recommended)
bash
Copy
Edit
# Run all services
docker-compose up --build
Access Backend: http://localhost:5000
Access Frontend: http://localhost:3000

🔸 Option 2: Run Services Individually
1. Start MongoDB manually via Docker:
bash
Copy
Edit
docker run -d \
  --name mongodb-dev \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -p 27017:27017 \
  mongo
2. Start Backend (Dev mode)
bash
Copy
Edit
cd backend
npm install
npm run dev
3. Start Frontend (React/Next)
bash
Copy
Edit
cd frontend
npm install
npm run dev
🔐 Authentication
Register
POST /api/auth/register
Body:

json
Copy
Edit
{
  "username": "beekeeper1",
  "password": "pass123",
  "role": "beekeeper"
}
Login
POST /api/auth/login

Get token and pass as Bearer <token> in headers.

🧪 Sample Postman Collection
➡️ Include a Postman collection in postman/ folder (or export it via Postman).

📄 API Endpoints

Method	Endpoint	Description
POST	/api/hives	Add new hive log
GET	/api/hives	Get all hive logs (pagination)
POST	/api/crops	Add new crop entry
GET	/api/crops/nearby	Find nearby flowering crops
POST	/api/auth/register	Register user (admin/beekeeper)
POST	/api/auth/login	Login and get JWT token
📂 Sample Crop JSON (Mock Data)
json
Copy
Edit
{
  "name": "Sunflower",
  "floweringStart": "2025-04-10",
  "floweringEnd": "2025-04-25",
  "latitude": 26.9124,
  "longitude": 75.7873,
  "recommendedHiveDensity": 5
}
✨ Bonus Features
Swagger/OpenAPI Documentation at /api-docs

Role-based dashboard (Admin only)

Export logs as CSV

👨‍💻 Author
Built by Ashish 🚀
Inspired by real-world field tracking systems 🐝

📝 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you want the Postman collection exported or if you'd like to auto-generate Swagger