async function weather(location = 'london') {
  const ap = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=7234534582a9cee42e342af67c53a4f9`);
  const response = await ap.json();
  const { name, coord } = response;
  return { name, coord };
}

async function daily(loc) {
  const currentLoc = await weather(loc);
  const ap = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLoc.coord.lat}&lon=${currentLoc.coord.lon}&exclude=minutely&units=metric&appid=7234534582a9cee42e342af67c53a4f9`);
  const response = await ap.json();
  const weatherData = response;
  weatherData.name = currentLoc.name;
  console.log(response);
  return weatherData;
}

export { daily, weather };
