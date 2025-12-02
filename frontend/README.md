# 🗺️ Interactive Map Explorer

A full-stack web application for discovering and exploring locations around Nagpur, India. Built with React, Node.js, Express, and MongoDB, featuring an interactive map interface powered by Leaflet.

![Interactive Map](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen) ![Leaflet](https://img.shields.io/badge/Leaflet-Maps-orange)

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## ✨ Features

- 🗺️ **Interactive Map Interface** - Explore locations with a dynamic Leaflet map
- 🔍 **Search Functionality** - Find locations by name with real-time search
- 🏷️ **Category Filtering** - Filter locations by category (Restaurants, Parks, Museums, Landmarks, Cafes)
- 📍 **Geolocation Support** - Center map to user's current location
- 🎨 **Color-Coded Markers** - Different colored markers for each category
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🗃️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- 🌱 **Database Seeding** - Quick setup with pre-populated Nagpur landmarks
- 🖼️ **Rich Popups** - Detailed information cards with images and descriptions

## 🛠️ Technology Stack

### Frontend
- **React** 18.2.0 - UI library
- **Leaflet** 1.9.4 - Interactive maps
- **React Leaflet** 4.2.1 - React components for Leaflet
- **Axios** 1.5.0 - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 7.5.0 - MongoDB ODM
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variables

## 📁 Project Structure

```
interactive-map/
│
├── backend/
│   ├── models/
│   │   └── Location.js          # MongoDB schema
│   ├── routes/
│   │   └── locations.js         # API routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.js          # Map component
│   │   │   └── SearchBar.js    # Search component
│   │   ├── App.js              # Main component
│   │   ├── App.css             # Styles
│   │   └── index.js            # Entry point
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Akash79665/interactive-map.git
cd interactive-map
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/interactive-map" >> .env

# Start MongoDB (if not running)
# For Windows: net start MongoDB
# For Mac/Linux: sudo systemctl start mongod

# Start backend server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 🎯 Usage

### First Time Setup
1. Open the application at `http://localhost:3000`
2. Click the **"🌱 Seed Database"** button to populate initial locations
3. Explore the map with pre-loaded Nagpur landmarks

### Features Usage

**Search Locations:**
- Type location name in the search bar
- Press Enter or click Search button
- Map will center on the found location

**Filter by Category:**
- Click category buttons (Restaurants, Parks, Museums, etc.)
- Map updates to show only selected category

**View Location Details:**
- Click on any marker on the map
- Popup will display location information, image, and address

**Find Your Location:**
- Click "📍 My Location" button
- Allow browser location access
- Map centers to your current position

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/locations`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all locations |
| GET | `/category/:category` | Get locations by category |
| GET | `/search/:query` | Search locations by name |
| GET | `/:id` | Get single location by ID |
| POST | `/` | Create new location |
| POST | `/seed` | Seed database with initial data |

### Example API Calls

**Get all locations:**
```bash
curl http://localhost:5000/api/locations
```

**Search locations:**
```bash
curl http://localhost:5000/api/locations/search/Deekshabhoomi
```

**Create new location:**
```bash
curl -X POST http://localhost:5000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Location",
    "category": "restaurant",
    "description": "Amazing place",
    "coordinates": {"lat": 21.1458, "lng": 79.0882},
    "address": "Nagpur"
  }'
```

## 📸 Screenshots

### Main Interface
The application displays an interactive map with location markers and search functionality.

### Category Filters
Users can filter locations by categories like Restaurants, Parks, Museums, Landmarks, and Cafes.

### Location Details
Clicking on markers reveals detailed information including images, descriptions, and addresses.

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interactive-map
```

**Frontend:**
Update API URL in `src/App.js`:
```javascript
const API_URL = 'http://localhost:5000/api/locations';
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check MongoDB URI in `.env` file
- Verify MongoDB port (default: 27017)

### CORS Errors
- Ensure backend CORS is enabled
- Check if backend is running on port 5000
- Verify API URL in frontend matches backend

### Map Not Loading
- Check browser console for errors
- Ensure Leaflet CSS is loaded in `index.html`
- Verify internet connection for map tiles

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Your Name: Akash Turkhade
- GitHub: https://github.com/Akash79665/interactive-map.git
- Email: apturkhade@gmail.com

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Leaflet for mapping library
- Unsplash for placeholder images
- MongoDB for database

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Add/edit/delete locations from UI
- [ ] User reviews and ratings
- [ ] Directions and routing
- [ ] Mobile app version
- [ ] Advanced filtering options
- [ ] Location photos upload
- [ ] Social sharing features

---

**Made with ❤️ in  India**