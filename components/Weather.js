'use client';
import React, { useState } from "react";
import { getWeather, getCitySuggestions } from "../lib/weather";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState(""); // State to store the city name entered by the user
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [citySuggestions, setCitySuggestions] = useState([]); // State to store city suggestions
  const [error, setError] = useState(""); // State to store any error message

  // Handle user input for city search
  const handleSearch = async (event) => {
    const input = event.target.value;
    setCity(input);
    setError(""); // Clear error when typing starts
    if (input.length > 2) {
      const suggestions = await getCitySuggestions(input);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };

  // Handle city selection from suggestions
  const handleCitySelection = async (cityName) => {
    setCity(cityName); // Set the selected city name in the state
    await fetchWeather(cityName); // Fetch weather data for the selected city
    setCitySuggestions([]); // Clear suggestions
  };

  // Handle Enter key press
  const handleEnterPress = async (event) => {
    if (event.key === "Enter") {
      await fetchWeather(city); // Fetch weather data for the entered city
      setCitySuggestions([]); // Clear suggestions
    }
  };

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    const weather = await getWeather(cityName);
    if (weather) {
      setWeatherData({ ...weather, cityName }); // Include the city name in the weather data
      setError(""); // Clear any error
    } else {
      setWeatherData(null); // Clear previous weather data
      setError("Unable to fetch weather data. Please try again.");
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1 className={styles.weatherHeader}>Weather App</h1>

      {/* Search input */}
      <input
        type="text"
        value={city}
        onChange={handleSearch}
        onKeyDown={handleEnterPress}
        placeholder="Search for city"
        className={styles.weatherSearchInput}
      />

      {/* Submit button */}
      <button
        onClick={() => fetchWeather(city)}
        className={styles.weatherSubmitBtn}
      >
        Get Weather
      </button>

      {/* City suggestions dropdown */}
      {citySuggestions.length > 0 && (
        <ul className={styles.weatherSuggestions}>
          {citySuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleCitySelection(suggestion.name)}
              className={styles.weatherSuggestionItem}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}

      {/* Display weather data */}
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherCityName}>{weatherData.cityName}</h2>
          <p className={styles.weatherTemp}>Temperature: {weatherData.temperature}°C</p>
          <p className={styles.weatherCondition}>Condition: {weatherData.condition}</p>
          <p className={styles.weatherWind}>Wind Speed: {weatherData.windSpeed} km/h</p>
          <p className={styles.weatherHumidity}>Humidity: {weatherData.humidity}%</p>
        </div>
      )}

      {/* Display error message */}
      {error && <div className={styles.weatherError}>{error}</div>}

      {/* Source code section */}
      <div className={styles.sourceCodeContainer}>
        <p>Source Code: <a href="https://github.com/shreyastagram/weather_app" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      </div>
    </div>
  );
};

export default Weather;
