import React, { useState } from 'react';

function SearchBar({ onSearch, onCategoryChange, selectedCategory }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'restaurant', label: '🍴 Restaurants' },
    { value: 'park', label: '🌳 Parks' },
    { value: 'museum', label: '🏛️ Museums' },
    { value: 'landmark', label: '🏰 Landmarks' },
    { value: 'cafe', label: '☕ Cafes' }
  ];

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-search">
          🔍 Search
        </button>
      </form>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;