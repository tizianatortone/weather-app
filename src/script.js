function completeDate() {
  let now = new Date();
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
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    time.innerHTML = `${currentDay} ${dayNumber}, ${hour}: 0${minutes}`;
  } else {
    time.innerHTML = `${currentDay} ${dayNumber}, ${hour}: ${minutes}`;
  }
}

completeDate();
//It may not show the time at first but once reloading the window on the right it does.

function showTemp(response) {
  let city = document.querySelector("#name");
  let degrees = document.querySelector("#temperature");
  let country = document.querySelector("h4");
  let temperature = Math.round(response.data.main.temp);
  degrees.innerHTML = `${temperature}°`;
  city.innerHTML = `${response.data.name}`;
  country.innerHTML = null;
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


