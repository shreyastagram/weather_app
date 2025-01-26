'use client';
import React, { useState } from "react";
import { getWeather, getCitySuggestions } from "../lib/weather";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    const input = event.target.value;
    setCity(input);
    setError("");
    if (input.length > 2) {
      const suggestions = await getCitySuggestions(input);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySelection = async (cityName) => {
    setCity(cityName);
    await fetchWeather(cityName);
    setCitySuggestions([]);
  };

  const handleEnterPress = async (event) => {
    if (event.key === "Enter") {
      await fetchWeather(city);
      setCitySuggestions([]);
    }
  };

  const fetchWeather = async (cityName) => {
    const weather = await getWeather(cityName);
    if (weather) {
      setWeatherData({ ...weather, cityName });
      setError("");
    } else {
      setWeatherData(null);
      setError("Unable to fetch weather data. Please try again.");
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1 className={styles.weatherHeader}>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleSearch}
        onKeyDown={handleEnterPress}
        placeholder="Search for city"
        className={styles.weatherSearchInput}
      />
      <button
        onClick={() => fetchWeather(city)}
        className={styles.weatherSubmitBtn}
      >
        Get Weather
      </button>
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
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherCityName}>{weatherData.cityName}</h2>
          <p className={styles.weatherTemp}>Temperature: {weatherData.temperature}°C</p>
          <p className={styles.weatherCondition}>Condition: {weatherData.condition}</p>
          <p className={styles.weatherWind}>Wind Speed: {weatherData.windSpeed} km/h</p>
          <p className={styles.weatherHumidity}>Humidity: {weatherData.humidity}%</p>
        </div>
      )}
      {error && <div className={styles.weatherError}>{error}</div>}
      <div className={styles.sourceCodeContainer}>
        <p>Source Code: <a href="https://github.com/shreyastagram/weather_app" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      </div>
    </div>
  );
};

export default Weather;
