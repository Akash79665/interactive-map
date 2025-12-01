import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import './App.css';

const API_URL = 'http://localhost:5000/api/locations';

function App() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([21.1458, 79.0882]); // Nagpur coordinates
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch locations from backend
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setLocations(response.data);
      setFilteredLocations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load locations. Make sure the backend is running!');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Seed database with initial data
  const seedDatabase = async () => {
    try {
      await axios.post(`${API_URL}/seed`);
      fetchLocations();
      alert('Database seeded successfully!');
    } catch (err) {
      alert('Failed to seed database');
      console.error('Error seeding:', err);
    }
  };

  // Search locations
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredLocations(locations);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/search/${query}`);
      setFilteredLocations(response.data);
      
      if (response.data.length > 0) {
        const first = response.data[0];
        setMapCenter([first.coordinates.lat, first.coordinates.lng]);
        setSelectedLocation(first);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Filter by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(loc => loc.category === category);
      setFilteredLocations(filtered);
    }
  };

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          alert('Map centered to your location!');
        },
        (error) => {
          alert('Unable to get your location');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🗺️ Interactive Map Explorer</h1>
        <p>Discover amazing locations around Nagpur</p>
      </header>

      <SearchBar 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryFilter}
        selectedCategory={selectedCategory}
      />

      <div className="controls">
        <button onClick={getUserLocation} className="btn btn-location">
          📍 My Location
        </button>
        {locations.length === 0 && !loading && (
          <button onClick={seedDatabase} className="btn btn-seed">
            🌱 Seed Database
          </button>
        )}
      </div>

      {loading && <div className="loading">Loading locations...</div>}
      
      {error && (
        <div className="error">
          {error}
          <br />
          <small>Run: cd backend && npm install && npm start</small>
        </div>
      )}

      {!loading && !error && (
        <Map 
          locations={filteredLocations}
          center={mapCenter}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}

      <footer className="app-footer">
        <p>Total Locations: {filteredLocations.length}</p>
      </footer>
    </div>
  );
}

export default App;