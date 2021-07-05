
function formatDate(date) {
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
let currentHour =  date.getHours();
if (currentHour < 10 ){
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10 ){
  currentMinutes = `0${currentMinutes}`;
}

return `${currentDay}, ${currentHour}:${currentMinutes}`;                                                                             
}

let currentTime = new Date();
let formattedDate = document.querySelector("#time");
formattedDate.innerHTML= formatDate(currentTime);       



function displayWeatherCondition(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#units");
  temp.innerHTML = Math.round(response.data.main.temp
  );

  let description = document.querySelector("#description");
  description.innerHTML =response.data.weather[0].main;                

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

}


function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;             
  
  axios.get(apiUrl).then(displayWeatherCondition); 
}

searchCity("New York");    


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
 
  searchCity(city);  
 
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);



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



