import axios from "axios";

// Function to fetch weather data based on city name
const getWeather = async (location) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Ensure the correct key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await axios.get(url);
    console.log(response.data); // Debugging log for API response

    // Ensure the expected structure and return the data
    if (response.data && response.data.current) {
      return {
        temperature: response.data.current.temp_c, // Celsius temperature
        condition: response.data.current.condition.text, // Weather condition
        windSpeed: response.data.current.wind_kph, // Wind speed in km/h
        humidity: response.data.current.humidity, // Humidity in percentage
      };
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
    return null;
  }
};

// Function to fetch city suggestions based on user input
const getCitySuggestions = async (input) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Ensure the correct key
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`;

  try {
    const response = await axios.get(url);
    console.log("City Suggestions Response:", response.data); // Debugging log for response
    return response.data; // Returning city suggestions
  } catch (error) {
    console.error("Error fetching city suggestions:", error.response ? error.response.data : error.message);
    return [];
  }
};

export { getWeather, getCitySuggestions };
