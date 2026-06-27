🌍 TourGenie - AI Travel Planner & Local Guide Platform
📌 Overview

TourGenie is an AI-powered travel planning platform that helps tourists generate personalized travel itineraries and connect with verified local guides. The platform combines Artificial Intelligence, interactive maps, weather forecasting, and guide booking into one seamless travel experience.

Whether you're planning your next adventure or looking for a trusted local guide, TourGen makes travel planning smarter, easier, and more personalized.

🚀 Features
🤖 AI Travel Planner

Generate customized travel itineraries based on:

Destination
Budget
Number of travel days
Interests
Travel style

The AI creates a complete day-wise itinerary including suggested attractions and activities.

👨‍💼 Local Guide Marketplace

Users can register as:

Tourist
Guide

Guides can:

Create professional profiles
Set pricing
Add experience and languages
Update availability

Tourists can:

Browse nearby guides
View guide profiles
Book guides
🗺️ Interactive Maps

The platform provides:

Destination visualization
Tourist location
Guide locations
Tourist attractions
Route planning
🌦 Weather Forecast

Before traveling, users can view:

Current weather
Multi-day forecast
Temperature
Weather conditions

This helps travelers prepare for their trip.

🔐 Secure Authentication
User Registration
Login
Password Encryption
JWT Authentication
Role-Based Authorization
💻 Tech Stack
Frontend
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT
bcrypt
APIs
Google Gemini API
Map API
Weather API
📂 Project Structure
TourGen
│
├── frontend
│   ├── css
│   ├── js
│   ├── images
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── ...
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
⚙️ Installation
Clone the repository
git clone <repository-url>
Backend
cd backend

npm install

npm run dev
Frontend

Open the frontend folder using your preferred local server.

🔑 Environment Variables

Create a .env file inside the backend directory.

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
👥 User Roles
Tourist
Register/Login
Generate AI travel plans
View weather
Explore destinations on the map
Find guides
Book guides
Guide
Register/Login
Create guide profile
Update profile
Manage availability
Accept or reject bookings
🔄 Workflow
User Login
      │
      ▼
Choose Role
      │
 ┌────┴─────┐
 ▼          ▼
Tourist    Guide
 │           │
 │      Create Profile
 │
 ▼
Dashboard
 │
 ├──────────────┐
 ▼              ▼
AI Planner   Find Guide
 │              │
 ▼              ▼
Generate Plan  Browse Guides
 │              │
 └──────┬───────┘
        ▼
     Book Guide
        ▼
   Complete Trip
        ▼
   Leave Review
🌟 Future Enhancements
Live guide tracking
Real-time chat
Online payments
Hotel recommendations
Flight integration
Offline itinerary
Voice assistant
Multi-language support
🎯 Project Goal

TourGen aims to simplify travel planning by combining AI-generated itineraries with trusted local guide services, giving travelers a smarter and more personalized experience from planning to exploration.

👨‍💻 Team

Developed for the Tourism Hackathon 2026.

📜 License

This project is developed for educational and hackathon purposes.
