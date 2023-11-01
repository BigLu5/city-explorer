import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();
    if (!search) {
      setError("Please enter a valid location.");
      return;
    }

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    try {
      const res = await axios.get(API);
      setLocation(res.data[0]);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching data.");
    }
  }

  return (
    <main>
      <div className="search">
        <h1>City Locator</h1>
        <form onSubmit={getLocation}>
          <input onChange={handleChange} placeholder="Location" />
          <button className="explore-btn">Explore!</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      {location && !error && (
        <div className="display">
          <p>Longitude: {location.lon}</p>
          <p>Latitude: {location.lat}</p>
          <h2>Location: {location.display_name}</h2>
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=13&format=png`}
            alt="Map"
          />
        </div>
      )}
    </main>
  );
}

export default App;
