import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { weatherApiKey, weatherApiUrl, weatherForecastApiUrl } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import BackgroundWrapper from "./components/BackgroundWrapper";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    'url("/bg/rainy.jpg")'
  );

  // Function to update the background image
  const updateBackgroundImage = (icon) => {
    let newBackgroundImage;
    if (icon === "01d") {
      newBackgroundImage = "url('/bg/sunny.webp')";
    } else if (icon === "01n") {
      newBackgroundImage = "url('/bg/moon.jpg')";
    } else if (icon === "02d" || icon === "03d" || icon === "04d") {
      newBackgroundImage = "url('/bg/cloud.jpg')";
    } else if (icon === "02n" || icon === "03n" || icon === "04n") {
      newBackgroundImage = "url('/bg/cloudy-night.jpg')";
    } else if (
      icon === "09n" ||
      icon === "10n" ||
      icon === "09d" ||
      icon === "10d"
    ) {
      newBackgroundImage = "url('/bg/rain.jpg')";
    } else if (icon === "11n" || icon === "11d") {
      newBackgroundImage = "url('/bg/storm.jpg')";
    } else if (icon === "13n" || icon === "13d") {
      newBackgroundImage = "url('/bg/snow.jpg')";
    } else if (icon === "50n" || icon === "50d") {
      newBackgroundImage = "url('/bg/mist.jpg')";
    } else {
      newBackgroundImage = "url('/bg/rainy.jpg')";
    }
    setBackgroundImage(newBackgroundImage);
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    const forecastFetch = fetch(
      `${weatherForecastApiUrl}forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        console.log({ searchData });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="App">
      <BackgroundWrapper backgroundImage={backgroundImage} />
      <div className="lefttooo">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && (
          <CurrentWeather
            data={currentWeather}
            onWeatherChange={updateBackgroundImage}
          />
        )}
      </div>
      <div className="rightoooo">
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
