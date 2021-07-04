async function weather(location = 'london') {
  const ap = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=7234534582a9cee42e342af67c53a4f9`);
  const response = await ap.json();
  const { name, coord } = response;
  const { country } = response.sys;
  return { name, coord, country };
}

async function daily(loc, unit = 'metric') {
  const currentLoc = await weather(loc);
  const ap = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLoc.coord.lat}&lon=${currentLoc.coord.lon}&exclude=minutely&units=${unit}&appid=7234534582a9cee42e342af67c53a4f9`);
  const response = await ap.json();
  const weatherData = response;
  weatherData.name = currentLoc.name;
  weatherData.country = currentLoc.country;
  return weatherData;
}

export default daily;
