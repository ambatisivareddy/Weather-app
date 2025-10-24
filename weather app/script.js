const apiKey = "e1048c5051c4373092b0540b0b376896";  // 🔑 Get from https://openweathermap.org/api

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = `<p>City not found. Try again!</p>`;
      return;
    }

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="${icon}" alt="Weather icon">
      <p><strong>${data.weather[0].description}</strong></p>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching data. Please try again.</p>`;
  }
}
