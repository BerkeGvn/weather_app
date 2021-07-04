const input = document.querySelector('.header_nav_city-picker');
const btn = document.querySelector('.header_nav_find');
const header = document.querySelector('.current_city');
const currentTemp = document.querySelector('.current_temp');
const currentWeather = document.querySelector('.current_weather');
const currentTime = document.querySelector('.current_time');
const currentIcon = document.querySelector('.current_icon');
const currentFeelsLike = document.querySelector('.current_feels-like span');
const currentHumidity = document.querySelector('.current_humidity span');
const currentClouds = document.querySelector('.current_clouds span');
const currentSunrise = document.querySelector('.current_sunrise span');
const currentSunset = document.querySelector('.current_sunset span');
const currentWind = document.querySelector('.current_wind span');
const hours = document.querySelectorAll('.hours');
const days = document.querySelectorAll('.days');
const metric = document.querySelector('.fahre');
const checkbox = document.querySelector('.checkbox');

export {
  input, btn, header, currentTemp, currentWeather, currentTime, currentIcon,
  currentFeelsLike, currentHumidity, currentClouds, currentSunrise, currentSunset, currentWind,
  hours, days, metric, checkbox,
};
