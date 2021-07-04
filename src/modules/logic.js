import moment from 'moment-timezone';
import * as dom from './dom';
import daily from './weatherAPI';

// tasiyabilirim
function toFirtLetterUpperCase(phrase) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

let currentCity;
let celcius = true;
dom.checkbox.checked = false;
async function getCurrentView(city) {
  dom.header.textContent = `${city.name} , ${city.country}`;
  dom.currentTime.textContent = moment().tz(city.timezone).format('HH:mm');

  dom.currentTemp.textContent = `${city.current.temp.toFixed()} °`;

  dom.currentWeather.textContent = toFirtLetterUpperCase(city.current.weather[0].description);
  const { icon } = city.current.weather[0];
  dom.currentIcon.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  dom.currentWind.textContent = ` ${city.current.wind_speed}`;
  dom.currentFeelsLike.textContent = ` ${city.current.feels_like.toFixed()}°`;
  dom.currentHumidity.textContent = ` ${city.current.humidity}%`;
  dom.currentClouds.textContent = ` ${city.current.clouds}%`;
  dom.currentSunrise.textContent = moment.tz(new Date(city.current.sunrise * 1000), city.timezone).format('kk:mm');
  dom.currentSunset.textContent = moment.tz(new Date(city.current.sunset * 1000), city.timezone).format('kk:mm');
}

function getHourlyWeather(city) {
  for (let i = 0; i < dom.hours.length; i += 1) {
    const date = new Date(city.hourly[i + 1].dt * 1000);

    const hour = document.createElement('p');
    hour.textContent = moment.tz(date, city.timezone).format('kk:mm');

    const { icon } = city.hourly[i + 1].weather[0];
    const img = document.createElement('img');
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    const temperature = document.createElement('p');
    temperature.textContent = `${city.hourly[i + 1].temp.toFixed()}°`;

    dom.hours[i].appendChild(hour);
    dom.hours[i].appendChild(img);
    dom.hours[i].appendChild(temperature);
  }
}

function getDailyWeather(city) {
  for (let i = 1; i < dom.days.length; i += 1) {
    const date = new Date(city.daily[i].dt * 1000);

    const day = document.createElement('p');
    day.textContent = moment.tz(date, city.timezone).format('dddd');

    const { icon } = city.daily[i].weather[0];
    const img = document.createElement('img');
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    const humidity = document.createElement('p');
    humidity.textContent = `${city.daily[i].humidity} %`;

    const temperature = document.createElement('p');
    temperature.textContent = `${city.daily[i].temp.max.toFixed()}° / ${city.daily[i].temp.min.toFixed()}°`;

    dom.days[i].appendChild(day);
    dom.days[i].appendChild(img);
    dom.days[i].appendChild(humidity);
    dom.days[i].appendChild(temperature);
  }
}

function renderHours() {
  dom.hours.forEach((hour) => {
    while (hour.firstChild) {
      hour.removeChild(hour.firstChild);
    }
  });
}

function renderDays() {
  dom.days.forEach((day, i) => {
    if (i === 0) return;
    while (day.firstChild) {
      day.removeChild(day.firstChild);
    }
  });
}

async function initial() {
  currentCity = await daily();
  getCurrentView(currentCity);
  getHourlyWeather(currentCity);
  getDailyWeather(currentCity);
  return currentCity;
}
async function changeUnit(city) {
  const fahreneit = await daily(city, 'imperial');
  getCurrentView(fahreneit);
  renderHours();
  renderDays();
  getHourlyWeather(fahreneit);
  getDailyWeather(fahreneit);
}

async function getCityWeather() {
  const city = dom.input.value.trim();
  currentCity = await daily(city);
  dom.input.value = '';
}

async function updateWeather() {
  await getCityWeather();
  getCurrentView(currentCity);
  renderHours();
  renderDays();
  getHourlyWeather(currentCity);
  getDailyWeather(currentCity);
  if (dom.checkbox.checked) {
    changeUnit(currentCity.name);
  }
}

function events() {
  document.addEventListener('DOMContentLoaded', () => {
    initial();
  });

  dom.btn.addEventListener('click', () => {
    updateWeather();
  });

  dom.metric.addEventListener('change', () => {
    if (celcius) {
      changeUnit(currentCity.name);
    } else {
      getCurrentView(currentCity);
      renderHours();
      renderDays();
      getHourlyWeather(currentCity);
      getDailyWeather(currentCity);
    }
    celcius = !celcius;
  });
}
export default events;
