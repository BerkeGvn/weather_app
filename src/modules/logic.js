import moment from 'moment-timezone';
import * as dom from './dom';
import * as weather from './weatherAPI';

let currentCity;
function getCurrentView(city) {
  dom.header.textContent = city.name;
  dom.currentTime.textContent = moment().tz(city.timezone).format('HH:mm');
  dom.currentTemp.textContent = `${city.current.temp.toFixed()} ℃`;
  dom.currentWeather.textContent = city.current.weather[0].description;
}

async function initial() {
  currentCity = await weather.daily();
  getCurrentView(currentCity);
  console.log(currentCity.timezone);
  return currentCity;
}

async function getCityWeather() {
  const city = dom.input.value;
  currentCity = await weather.daily(city);
  dom.input.value = '';
}

async function updateWeather() {
  await getCityWeather();
  getCurrentView(currentCity);
}

function events() {
  document.addEventListener('DOMContentLoaded', () => {
    initial();
  });

  dom.btn.addEventListener('click', () => {
    updateWeather();
  });
}
export default events;
