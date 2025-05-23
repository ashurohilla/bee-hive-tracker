# 🐝 BeeTrail - Hive Management System

A full-stack beekeeping field logging application to help beekeepers manage hive placements and monitor pollination opportunities.

---

![BeeTrail Screenshot](image-1.png)

## 🔗 Live URLs



- Frontend: 🔗  
 https://bee-hive-tracker.vercel.app/
- Backend: 🔗    
https://beehivebackend-production.up.railway.app/api

---

## 🧪 Dummy Credentials (If you don't want to create an account)

### Admin Access
- **Email**: `ashish.rohilla@decimal.com`
- **Password**: `Ashish@3d21`

### Beekeeper Access
- **Email**: `ashishrohilla510@gmail.com`
- **Password**: `Ashish@3d21`

---

## 🏗 Project Infrastructure

- **Project Type**: Monolithic
- **Frontend**: Next.js 15 (App Router)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (hosted on Railway via Docker)
- **Containerization**: Docker + Docker Compose
- **Deployment**:
  - Frontend: Vercel
  - Backend: Railway.app
  - Database: Railway.app (MongoDB Docker image)

---

## 🚀 Features

- 🌍 Log hive placements with geolocation (latitude, longitude)
- 📅 View hive logs with date filtering and pagination
- 📥 Export hive logs to CSV
- 🧑‍🌾 Role-based login for **admin** and **beekeeper**
- 📊 Crop-pollination opportunity matching (geo-based, coming soon)
- 💻 Admin UI with ShadCN (forms, tables, cards, buttons)
- 🔐 Private routes ensure secure login for both admin and beekeeper

---

## 🔐 JWT Authentication

- Implemented JWT authentication for both server and client
- Secured private routes accessible only to authenticated and authorized users

---

## 📡 API Endpoints

### Auth
- `POST /register` — Registers user with email, password, and role (default: beekeeper)
- `POST /login` — Authenticates user and returns a JWT token

### Hives
- `POST /api/hives/createhive` — Create a hive
- `GET /api/hives/gethive` — Get all hives

### Crops
- `POST /api/crops/createcrop` — Create a crop location (requires type, latitude, longitude)
- `POST /api/crops/nearyby` — Get nearby crops (requires latitude and longitude)

📤 Export logs to an Excel file by logging in with a beekeeper account.

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | Next.js 15, ShadCN, Tailwind CSS     |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (via Docker)                |
| Infra      | Docker, Docker Compose              |
| Deployment | Vercel (Frontend), Railway (API & DB) |

---

## ⚙️ Local Development Setup

> Ensure you configure `.env` files for both frontend and backend using the provided `env.example`.

---

### 🐳 Docker: Frontend

```bash
cd beehive-tracker/frontend/beehivetracker

# Build Docker image
docker build -t beehivetracker .

# Run container
docker run -d -p 3000:3000 --name beehive-frontend beehivetracker

# Verify running containers
docker ps
```

Expected Output:

```
CONTAINER ID   IMAGE            COMMAND                  PORTS                    NAMES
b7c2c3fb222d   beehivetracker   "docker-entrypoint.s…"   0.0.0.0:3000->3000/tcp   beehive-frontend
```

---

### ▶️ Run Frontend Locally (Without Docker)

```bash
cd beehive-tracker/frontend/beehivetracker

npm install
npm run dev
```

---

### 🐳 Docker: Backend

```bash
cd beehive-tracker/backend

# Build Docker image
docker build -t beehivetrackerbackend .

# Run container
docker run -d -p 5000:5000 --name beehivetrackerbackend beehivetrackerbackend

# Verify running containers
docker ps
```

Expected Output:

```
CONTAINER ID   IMAGE                   COMMAND                  PORTS                    NAMES
5175a41f118d   beehivetrackerbackend   "docker-entrypoint.s…"   0.0.0.0:5000->5000/tcp   beehivetrackerbackend
```

---

### ▶️ Run Backend Locally (Without Docker)

```bash
cd beehive-tracker/backend

npm install
npm start
```

Backend should now be live at: `http://localhost:5000`

---

##  Logic for apis 

other apis are easier that are simple crud api .. 

the little hard is nearbycrop 

gets latitude , longitude and radius and return near by crops that are registered 

i have implemented using this function 

#### **Endpoint**
```
GET /api/crops/nearby
```


#### **Implementation:**

```js
module.exports = function haversine(loc1, loc2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers

  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);
  const lat1 = toRad(loc1.latitude);
  const lat2 = toRad(loc2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
```

The crops are filtered using two main checks:
1. The crop's **flowering period** should cover the provided date.
2. The crop should be **within the specified radius** from the given latitude and longitude.

---

#### ✅ Example Request:
```
GET /api/crops/nearby?latitude=28.6139&longitude=77.2090&radius=50
```

---

#### ✅ Example Response:

```json
[
  {
    "cropName": "Mustard",
    "latitude": 28.62,
    "longitude": 77.21,
    "floweringStart": "2024-12-01T00:00:00Z",
    "floweringEnd": "2025-03-15T00:00:00Z"
  },
  {
    "cropName": "Sunflower",
    "latitude": 28.59,
    "longitude": 77.22,
    "floweringStart": "2025-01-01T00:00:00Z",
    "floweringEnd": "2025-04-10T00:00:00Z"
  }
]
```


# postman docs 

[https://development-7029.postman.co/workspace/beehivebackend~5d1749a2-ac3a-48b9-a33d-af8abf0dc91e/collection/20337832-04bcdb6e-c6f3-44e3-ad46-6b3776a544f5?action=share&creator=20337832
](https://development-7029.postman.co/workspace/beehivebackend~5d1749a2-ac3a-48b9-a33d-af8abf0dc91e/collection/20337832-04bcdb6e-c6f3-44e3-ad46-6b3776a544f5?action=share&creator=20337832)

  




## 🧪 Other Skills & Interests

### 💻 Recently Learning:
- **Go (Golang)** — building innovative enterprise-grade cloud solutions
- **DevOps & Infrastructure**:
  - Docker, Kubernetes, Helm
  - Jenkins (CI/CD pipelines)
  - Ansible, Terraform (Infra as Code)
  - Linux, Bash scripting, Argo CD

### ⚙️ Hardware Hobbies:
- 3D Designing & Printing
- Tinkering with Arduino, Raspberry Pi, NodeMCU

---

## 🚀 Projects & Work

- **Diana Sentinel** (Internship project): Employee monitoring system with Django REST API + React frontend + desktop screenshot capture client  
  🔗 [https://www.dianasentinel.com/login](https://www.dianasentinel.com/login)

- **Hardware Garage**: Blogging + course platform with node-based editor like Medium  
  🔗 [https://hardwaregarage-git-main-ashurohillas-projects.vercel.app/](https://hardwaregarage-git-main-ashurohillas-projects.vercel.app/)

- **My Kaksha**: Community newsletter builder + content selling platform  
  🔗 [https://my-kaksha-by-ashish.vercel.app/](https://my-kaksha-by-ashish.vercel.app/)

- **Portfolio**:  
  🔗 [https://ashish-rohilla.web.app/](https://ashish-rohilla.web.app/)

- **Agency Page (ScaleSaaS)**:  
  🔗 [https://scale-saas.vercel.app/](https://scale-saas.vercel.app/)

- **3D Website**:  
  🔗 [https://peakyypages.vercel.app/](https://peakyypages.vercel.app/)

- **Freelance Work**:  
  🔗 [https://www.homefinderr.com/](https://www.homefinderr.com/)

---

## 📬 Contact

- **Email**: ashishrohilla510@gmail.com  
- **Phone**: +91 95883 68052  
- **LinkedIn**: [Ashish Rohilla](https://www.linkedin.com/in/ashish-rohilla-3200011ba/)

---

## 🐳 Docker Compose

```bash
docker-compose up --build
```

- Frontend: `localhost:3000`
- Backend: `localhost:5000`
- MongoDB: `localhost:27017`

> ⚠️ Make sure `.env` variables are set properly. Uncomment local variables if necessary.
```


will add more  things till 20 april 

thanks and regards
