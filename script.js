import { api_key } from "./config.js";

const inputCity = document.getElementById("inputCity");
const searchCity = document.querySelector(".searchCity");
const displayWeatherImg = document.querySelector(".displayWeatherImg");
const displayTemp = document.querySelector(".display-temp");
const displayCity = document.querySelector(".display-city");
const displayHumidity = document.querySelector(".display-humidity");
const displayWindSpeed = document.querySelector(".display-windSpeed");
const errorMsg = document.querySelector(".error-div");
const outputDiv = document.querySelector(".output-div");

const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey = api_key;

async function weatherApp(city) {
  const response = await fetch(apiURL + `&q=${city}` + `&appid=${apiKey}`);

  if (response.status >= 400 && response.status < 500) {
    errorMsg.style.display = "block";
    outputDiv.style.display = "none";
  } else {
    const data = await response.json();

    displayTemp.textContent = Math.trunc(data.main.temp) + "°C";
    displayCity.textContent = data.name;
    displayHumidity.textContent = data.main.humidity + "%";
    displayWindSpeed.textContent = data.wind.speed + "km/h";

    // Display Weather Image
    if (data.weather[0].main === "Clouds") {
      displayWeatherImg.setAttribute("src", "./images/clouds.png");
    }
    if (data.weather[0].main === "Clear") {
      displayWeatherImg.setAttribute("src", "./images/clear.png");
    }
    if (data.weather[0].main === "Drizzle") {
      displayWeatherImg.setAttribute("src", "./images/drizzle.png");
    }
    if (data.weather[0].main === "Mist") {
      displayWeatherImg.setAttribute("src", "./images/mist.png");
    }
    if (data.weather[0].main === "Rain") {
      displayWeatherImg.setAttribute("src", "./images/rain.png");
    }
    if (data.weather[0].main === "Snow") {
      displayWeatherImg.setAttribute("src", "./images/snow.png");
    }

    // Display output div
    errorMsg.style.display = "none";
    outputDiv.style.display = "block";
  }
}
searchCity.addEventListener("click", function (e) {
  weatherApp(`${inputCity.value}`);
  inputCity.value = "";
});
