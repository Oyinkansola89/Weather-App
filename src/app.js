
function formatDate(date) {
let date = new Date();

let currentHour =  date.getHours();
if (currentHour < 10 ){
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10 ){
  currentMinutes = `0${currentMinutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[date.getDay()];
return `${currentDay}, ${currentHour}:${currentMinutes}`;                                                                             
}


    
function displayWeatherCondition(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#units");
  temp.innerHTML = Math.round(celsiusTemperature);

  let description = document.querySelector("#description");
  description.innerHTML =response.data.weather[0].main;                

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;


 let formattedDate = document.querySelector("#time");
 formattedDate.innerHTML= formatDate(response.data.dt * 1000); //format date call

 celsiusTemperature = response.data.main.temp;

}


function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;             
  
  axios.get(apiUrl).then(displayWeatherCondition); 
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  
  searchCity(cityInput.value);  
 
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#units");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");    


function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);                
}



function getCurrentLocation(event) {
  event.preventDefault();
  
  navigator.geolocation.getCurrentPosition(searchLocation);          
}

let currentLocationButton = document.querySelector("#current-location-button");          
currentLocationButton.addEventListener("click", getCurrentLocation);

