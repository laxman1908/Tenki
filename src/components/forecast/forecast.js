import React from "react";

const Forecast = ({ data }) => {
  function getDayName(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  function getWindDirection(angle) {
    const directions = [
      "↓ N",
      "↙ NE",
      "← E",
      "↖ SE",
      "↑ S",
      "↗ SW",
      "→ W",
      "↘ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  }
  const selectedIndices = [0, 7, 15, 23, 31, 39];
  return (
    <div className="flex-col gap-4 items-center justify-center">
      {data.list
        .filter((_, index) => selectedIndices.includes(index))
        .map((item, index) => (
          <div key={index} className="cards-div">
            <span className="txt-head">
              <span className="dayName">
                {getDayName(item.dt_txt.substring(0, item.dt_txt.indexOf(" ")))}
              </span>
              <span className="forecast-temp">
                {Math.round(item.main.temp)}°
              </span>
              <span className="forecast-icon">
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  className="h-12"
                  alt={`${item.weather[0].main}`}
                />
              </span>
            </span>
            <span className="txt-desc">
              <span className="txt-desc-details">
                <span className="flex">
                  <img src="/date.png" alt="Date: " className="h-6 w-6" />{" "}
                  &nbsp;
                  {item.dt_txt
                    .substring(0, item.dt_txt.indexOf(" "))
                    .split("-")
                    .reverse()
                    .join("-")}
                </span>
                <span className="capitalize">
                  {item.weather[0].description}
                </span>
                <span>Min: {Math.round(item.main.temp_min)}°</span>
                <span>Max: {Math.round(item.main.temp_max)}°</span>
                <span>Humidity: {Math.round(item.main.humidity)}%</span>
              </span>
              <span className="flex flex-col text-center items-center basis-1/2">
                <img
                  src="wind.png"
                  className="h-10 w-10 self-center"
                  style={{ transform: `rotate(${item.wind.deg + 90}deg)` }}
                  alt="wind"
                />
                <span>
                  {Math.round(item.wind.speed * 3.6 * 100) / 100} Km/H
                  <br />
                  {getWindDirection(item.wind.deg)}
                </span>
              </span>
            </span>
          </div>
        ))}
    </div>
  );
};

export default Forecast;
