import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardTitle, Container, Form } from "react-bootstrap";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const WeatherImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: auto;
  right: 15px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.theme.buttonBg};
  color: white;
  font-size: 0.9rem;
`;

const Weather = () => {
  const [city, setCity] = useState("chennai");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeButton, setActiveButton] = useState("");

  const isFirstRender = useRef(true);

  const API_KEY = "438fcda949b392b1098e245743cf5742";

  const fetchWeather = async (query) => {
    console.log(query);

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        if (response.status === 404) throw new Error("City not found ❌");
        else throw new Error("Network error. Try again later 🌐");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
      setActiveButton("search");

      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      localStorage.setItem("lastcity", query);
    } catch (err) {
      setError(err.message);
      console.log(err.message);

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            setError("");
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok)
              throw new Error("Failed to fetch weather data 🌐");
            const data = await response.json();
            setWeather(data);
            setCity(data.name);
            setActiveButton("mylocation");
            console.log(data);
          } catch (err) {
            setError(err.message);
            setWeather(null);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Permission denied or location unavailable 🚫");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser ❌");
      setLoading(false);
    }
  };

  const formatTime = (timeStamp) => {
    return new Date(timeStamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    const lastCity = localStorage.getItem("lastcity");
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    } else {
      fetchWeather(city);
    }
  }, []);

  const onViewLocation = (e) => {
    e.preventDefault();
    if (city.trim === "") {
      alert("Enter City");
      return;
    }
    fetchWeather(city);
  };

  return (
    <div className="container py-4 w-50">
      <CardTitle className="fw-bold fs-1 text-center mb-3">
        🌦️ Find Weather
      </CardTitle>

      <Form onSubmit={onViewLocation}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="d-flex gap-2 justify-content-center py-3">
          <Button type="submit" active={activeButton === "search"}>
            Search
          </Button>
          <Button
            type="button"
            active={activeButton === "mylocation"}
            onClick={fetchMyLocationWeather}
          >
            📍 My Location
          </Button>
        </div>
      </Form>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !loading && (
        <Card className="card-body text-center card d-flex align-items-center">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <WeatherImage
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <h2>{Math.round(weather.main.temp)}°C</h2>
          <p>{weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
          <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
        </Card>
      )}
    </div>
  );
};

export default Weather;
