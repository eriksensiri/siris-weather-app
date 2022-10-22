function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  return `${currentDay} | ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-sm-2 day">
              <div class="expected-day">${formatDay(forecastDay.dt)}</div>
           
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  response.daily.condition[0].icon_url
                }.png"
                alt="light rain"
                class="expected-temp-emoji"
              />
              <div class="expected-temp">
                <span class="forecast-expected-temp-max">${Math.round(
                  forecastDay.daily.temperature.maximum
                )}° | </span>
                <span class="forecast-expected-temp-min">${Math.round(
                  forecastDay.daily.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();
let nowWeather;

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(now);

function getForecast(coordinates) {
  let apiKey = `b2fo6a4183fddd3et8f2bf45803cb177`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let city = response.data.city;
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${city}`;

  let lowestTemperature = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector(".min-temperature");
  minTemperature.innerHTML = `${lowestTemperature}`;

  let highestTemperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector(".max-temperature");
  maxTemperature.innerHTML = `${highestTemperature}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.wind.speed);

  let nowWeather = document.querySelector("#now-weather");
  nowWeather.innerHTML = response.condition[0].description;

  let weatherEmoji = document.querySelector("#weather-emoji");
  weatherEmoji.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.condition[0].icon}.png`
  );
  weatherEmoji.setAttribute("alt", response.condition[0].description);

  getForecast(response.coordinates);
}

function searchfunction(city) {
  let apiKey = "b2fo6a4183fddd3et8f2bf45803cb177";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-Input").value;
  searchfunction(city);
}
let searchButton = document.querySelector("#location-search");
searchButton.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "b2fo6a4183fddd3et8f2bf45803cb177";
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
