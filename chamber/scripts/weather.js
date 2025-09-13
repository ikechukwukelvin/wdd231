const apiKey = "YOUR_API_KEY";
const lat = "YOUR_LAT";
const lon = "YOUR_LON";

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  const response = await fetch(weatherUrl);
  const data = await response.json();

  // Current weather
  const current = data.list[0];
  document.getElementById("current-weather").innerHTML = `
    <p>${Math.round(current.main.temp)}°C - ${current.weather[0].description}</p>
  `;

  // Forecast (next 3 days, 12:00pm entries)
  const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,3);
  document.getElementById("forecast").innerHTML = forecast.map(day => `
    <p>${new Date(day.dt_txt).toLocaleDateString()}: ${Math.round(day.main.temp)}°C</p>
  `).join("");
}

getWeather();
