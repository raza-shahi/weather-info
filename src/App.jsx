import { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [cityName, setCityName] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!cityName) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      

      if (data.cod === 200) {
        setReport(data);
        setError(null);
      } else {
        setReport(null);
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch data.');
      setReport(null);
    }
  };

  return (
    <div className="city-name">
      <h1>Weather App</h1>
      <input
      id='city'
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button className="button-container" onClick={fetchWeather}>
        Get Weather Report
      </button>

      <div className="result">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {report && (
          <div>
            <p>Temperature: {report.main.temp}°C</p>
            <p>Weather: {report.weather[0].description}</p>
            <p>City: {report.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
