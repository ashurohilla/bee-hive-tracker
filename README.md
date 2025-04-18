# 🐝 BeeTrail - Hive Management System

A full-stack beekeeping field logging application to help beekeepers manage hive placements and monitor pollination opportunities.

---
![alt text](image-1.png)

Live urls ---- >>>  Frontend   https://bee-hive-tracker.vercel.app/

Backend------->>    Backend    https://beehivebackend-production.up.railway.app/api


dummy credentials if dont want to create and account 


## for admin access

Email---- >  ashish.rohilla@decimal.com
password --- > Ashish@3d21


## for beekeper access 

Email ----->  ashishrohilla510@gmail.com

password--->  Ashish@3d21

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
- 💻 Admin UI with ShadCN (form components, tables, cards, buttons)
- 💻 Private routes of both admin dashboard and beekeeper ensure perfect login


## jwt authentication for server and client 

- added private page route for both admina and  beekeeper ensure only visible for a valid authenticated and authorised user

## ALL api  endpoints

- /register -- takes email , password , role  for register user  ( default  role is beekeeper)

- /login -- >  takes email and password and return jwt token to client

- / api/hives   --- > /createhive  ----> create a hive 
                ----> /gethive     ----> get all hives   

-/api/crops    ----> /createcrop   create a crop location  takes type , latitude , longitude 
               ----> /nearyby     ---> takes latitude and langitude return near crop locations


---

## 🧰 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | Next.js 15, ShadCN, TailwindCSS |
| Backend     | Node.js, Express.js           |
| Database    | MongoDB (via Docker)          |
| Infra       | Docker, Docker Compose        |
| Deployment  | Vercel (Frontend), Railway (API & DB) |

---

## ⚙️ Local Development Setup

Setup .env files for frontend and backend  from  env.example


# Building Frontend using docker  


cd  beehive-tracker or press tab to find the root folder

cd frontend
cd beehivetracker 


build docker image for next js  --- >  docker build -t beehivetracker .

running container of image --->  docker run -d -p 3000:3000 --name beehive-frontend beehivetracker


check if its running -- > docker ps --- return all running containers

CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                    NAMES
b7c2c3fb222d   beehivetracker   "docker-entrypoint.s…"   23 seconds ago   Up 22 seconds   0.0.0.0:3000->3000/tcp   beehive-frontend

# Running Frontend locally

cd frontend 
cd beehivetracker

Run --- > npm install 

Run -- >  npm run dev



#  Building Backend using docker 

cd backend

build docker image  ---- >  docker build -t beehivetrackerbackend .

run docker image -- >   docker run -d -p 5000:5000 --name beehivetrackerbackend beehivetrackerbackend

check container using -- > docker ps


# building locally by cli 
 cd backend 

Run npm install 

Run npm start 

start dev server at --- localhost:5000



















###  My other  skills that i learned recently

currently learning Go lang because i find this language intersting and i can build inovative cloud solution at enterprize level 

learned infrastructure  and devops

-- docker
-- kubernetes  as container orchestration
--- helm 
--- jenkins  ci and cd piplines 
--- Ansible 
--- Teraform ( infra as code )
--- linux and bash scripting
--- Argo cd 


Hobyies skills

hardware tinkering 
know -- 3d designing and 3d printing 
hardware boards - like arduino , raspberry pi and node mcu 


i realy like to build products and have great interest in tech just want a  chance to prove .. really passionate about building products and realy hard wroking can work days and night 

my previous projects -- >   https://www.dianasentinel.com/login  

# Diana sentinel Employe monitoring software solution build during my internship for a uk based startup  composes of 3 apps .. desktop app as client which capture screenshots and data and sends to  a django restframework server  and frontend is build using react 


hardware garage -- > https://hardwaregarage-git-main-ashurohillas-projects.vercel.app/   Domain expired auth may fail


# hardware garage -- >   a hardware bloging platforma and text course  app build using next js , supabase and tailwind .. speciality node based editor just like medium.com 

# kakha  -- >   https://my-kaksha-by-ashish.vercel.app/ 

Comunnity builder and seller people can create community newsletter and sell their content to student -- example -- nail art instructor , Enterprenurship course by xyz founder

other random stuff 

# portfolio -- > https://ashish-rohilla.web.app/
# Agency page -- >  https://scale-saas.vercel.app/

# 3d website -- >  https://peakyypages.vercel.app/

# freelancing work -- > https://www.homefinderr.com/


thanks and regards

Email - ashishrohilla510@gmail.com
Phone no --  9588368052
linkedin-- https://www.linkedin.com/in/ashish-rohilla-3200011ba/ 













### using Docker

# docker-compose up --build

-- Frontend (localhost:3000)
-- Backend (localhost:5000)
-- MongoDB (localhost:27017)


may need to setup env variables for proper connection or uncomment the local variables


