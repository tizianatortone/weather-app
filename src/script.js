function completeDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let dayNumber = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    time.innerHTML = `${currentDay} ${dayNumber} | ${hour} : 0${minutes}`;
  } else {
    time.innerHTML = `${currentDay} ${dayNumber} | ${hour} : ${minutes}`;
  }
}
completeDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML += `
       <section> 
       <div>
  <div>
            <h6>
            ${formatDay(forecastDay.dt)} 
            </h6>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" />
            <p>
                ${Math.round(forecastDay.temp.max)}ºC  | ${Math.round(
        forecastDay.temp.min
      )}ºC
            </p>
 </div>  
</div>
<div class="h-divider"> </div>

        </section>
        
        `;
    }
  });

  forecastHTML = forecastHTML + ``;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "afeb02ebfbea916785c99a1a7504a564";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let city = document.querySelector("#name");
  let degrees = document.querySelector("#temperature");
  let country = document.querySelector("h4");
  let desc = document.querySelector("#description");

  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let minTemp = document.querySelector("#min");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#speed");
  let iconElement = document.querySelector("#emoji");
  degrees.innerHTML = `${temperature}`;
  city.innerHTML = `${response.data.name}`;
  country.innerHTML = `${response.data.sys.country}`;
  desc.innerHTML = `${response.data.weather[0].description}`;
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function defaultCity(city) {
  let apiKey = "afeb02ebfbea916785c99a1a7504a564";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "afeb02ebfbea916785c99a1a7504a564";
  let search = document.querySelector("#change-city");
  search = search.value.trim().toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let changeCity = document.querySelector("form");
changeCity.addEventListener("submit", handleSubmit);

function showLocation(position) {
  let apiKey = "afeb02ebfbea916785c99a1a7504a564";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locate = document.querySelector(".standing");
locate.addEventListener("click", getPosition);

function showFarenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

defaultCity("Barcelona");
