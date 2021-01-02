function completeDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[now.getDay()];
  let dayNumber = now.getDate();
  return `${currentDay}, ${dayNumber} | ${formatHours(timestamp)}`;
}



function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10)
  hour = `0${hour}`;
  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}
function showTemp(response) {
  let city = document.querySelector("#name");
  let degrees = document.querySelector("#temperature");
  let country = document.querySelector("h4");
  let desc = document.querySelector("#description");
  
  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(celsiusTemp);
  let dateElement = document.querySelector("#current-time")
  let minTemp = document.querySelector("#min");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#speed")
  let iconElement = document.querySelector("#emoji");


  degrees.innerHTML = `${temperature}`;
  city.innerHTML = `${response.data.name}`;
  country.innerHTML = `${response.data.sys.country}`;
  desc.innerHTML = `${response.data.weather[0].description}`;
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = completeDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index ++) {
  let forecast = response.data.list[index];
  forecastElement.innerHTML += `   
  <div class="col-6" id="forecast">
        <section class="card-group">
  <div class="card">
            <h6>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
            </h6>
            <p>
                ${formatHours(forecast.dt * 1000)} <br/> 
                <strong>${Math.round(forecast.main.temp_max)}ºC</strong> / ${Math.round(forecast.main.temp_min)}ºC
            </p>
        </div>  <br />
        </section>
        </div>`;
 
  }
}

function defaultCity(city) {
let apiKey = "afeb02ebfbea916785c99a1a7504a564";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "afeb02ebfbea916785c99a1a7504a564";
  let search = document.querySelector("#change-city");
  search = search.value.trim().toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
farenheitLink.addEventListener ("click", showFarenheitTemp)


let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", showCelsiusTemp);

defaultCity("Barcelona");