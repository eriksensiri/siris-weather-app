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

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(now);

let cityweather = document.querySelector("#location-search");
cityweather.addEventListener("submit", searchfunction);

function celsiusConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 23;
}

function fahrenheitConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 55;
}

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", celsiusConverter);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", fahrenheitConverter);

function cityTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let city = response.data.name;
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${city}`;

  let nowWeather = document.querySelector("#now-weather");
  nowWeather.innerHTML = response.data.weather[0].description;
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

function showIcon() {
  if (nowWeather === "clear sky") { return `icons/sun.png`; }
  else {
    if (nowWeather === "few clouds") { return `src/icons/cloud_sun.png`; }
  }
else {
    if (nowWeather === "scattered clouds") { return `src/icons/cloudy_sun.png`; }
  }
else {
    if (nowWeather === "broken clouds") { return `src/icons/clouds.png`; }
  }
else {
    if (nowWeather === "shower rain") { return `src/icons/sun.png`; }
  }
else {
    if (nowWeather === "rain") { return `src/icons/ligth_rain.png`; }
  }
else {
    if (nowWeather === "thunderstorm") { return `src/icons/cloud_rain_ligthing.png`; }
  }
else {
    if (nowWeather === "snow") { return `src/icons/cloud_snow_rain.png`; }
  }
else {
    if (nowWeather === "mist") { return `src/icons/cloud_wind.png`; }
  }
}
function searchfunction(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-Input").value;
  searchfunction(city);
}
let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", handleSubmit);

function showPosition(position) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
