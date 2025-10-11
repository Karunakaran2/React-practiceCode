import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const lightTheme = {
  background: "#f2f2f2",
  cardBg: "#ffffff",
  text: "#000",
  buttonBg: "#007bff",
};

const darkTheme = {
  background: "#121212",
  cardBg: "#1e1e1e",
  text: "#fff",
  buttonBg: "#ff9800",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }
`;

const Container = styled.div`
  text-align: center;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 220px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) =>
    props.active ? "green" : props.theme.buttonBg};
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  padding: 20px;
  border-radius: 12px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  width: 90%;
  max-width: 350px;
  transition: 0.3s;
`;

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
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <ThemeToggle
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </ThemeToggle>

        <Title>🌦️ Find Weather</Title>

        <Form onSubmit={onViewLocation}>
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
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
        </Form>

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && !loading && (
          <Card>
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
      </Container>
    </ThemeProvider>
  );
};

export default Weather;
