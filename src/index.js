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

let now = new Date();
let nowWeather;

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(now);

function celsiusConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 23;
}
let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", celsiusConverter);

function fahrenheitConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 55;
}
let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", fahrenheitConverter);

function cityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let city = response.data.name;
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${city}`;

  let lowestTemperature = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector(".min-temperature");
  minTemperature.innerHTML = `${lowestTemperature}`;

  let highestTemperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector(".max-temperature");
  maxTemperature.innerHTML = `${highestTemperature}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchfunction(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-Input").value;
  console.log({ city });
  searchfunction(city);
}
let searchButton = document.querySelector("#location-search");
searchButton.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}
function weatherEmoji(response) {
  let weather = document.querySelector("#now-weather");
  weather = response.data.weather[0].description;

  let weatherEmoji = document.querySelector("#weather-emoji");
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherEmoji.setAttribute("alt", response.data.weather[0].description);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
