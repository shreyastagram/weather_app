import axios from "axios";

const getWeather = async (location) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.current) {
      return {
        temperature: response.data.current.temp_c,
        condition: response.data.current.condition.text,
        windSpeed: response.data.current.wind_kph,
        humidity: response.data.current.humidity,
      };
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
    return null;
  }
};

const getCitySuggestions = async (input) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error.response ? error.response.data : error.message);
    return [];
  }
};

export { getWeather, getCitySuggestions };
