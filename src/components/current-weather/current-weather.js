import React, { useEffect } from "react";

const CurrentWeather = ({ data, onWeatherChange }) => {
  const convertToLocalTime = (data) => {
    const utcMilliseconds = data.dt * 1000;
    const localMilliseconds = utcMilliseconds + data.timezone * 1000;
    const localDate = new Date(localMilliseconds);

    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    onWeatherChange(data.weather[0].icon);
  }, [data]);

  const localTime = convertToLocalTime(data);

  return (
    <div className="cntWeather">
      <div className="row1">
        <span className="p-0 text-7xl font-bold">
          {Math.round(data.main.temp)}
          <span className="text-3xl font-semibold align-top">°C</span>
        </span>
        <img
          className="h-16 w-16 ml-12 basis-auto object-cover"
          src={`icons/${data.weather[0].icon}.png`}
          alt={`${data.weather[0].description}`}
        />
      </div>
      <p className="p-0 mr-auto text-4xl text-left ">{data.city}</p>
      <div className="row3">
        <span>{localTime} | &nbsp;</span>
        <span>H: {Math.round(data.main.temp_max)}°&nbsp;</span>
        <span>L: {Math.round(data.main.temp_min)}°&nbsp;</span>
      </div>
    </div>
  );
};

export default CurrentWeather;
