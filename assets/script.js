/*
1) user inputs city into search bar
2) user clicks submit button 
3) JS needs to be connected to users action of clicking HTML button (event listener)
3) Event listener attached to submit button listens for a click of button to submit username
4) We create a function that takes in the location of the users city name  
5) We create a function that takes in the users city name and gathers data about that city
6) Display users city data on current city temp when "Enter" key or "Submit" button is clicked
7) Create function for current weather
8) Create Temp Wind and Humidity elements to display live on the current weather section
9) How to create a 5-day forecast

setparate functions for current weather and five day forecst*/
// My API key: 38438435bd1e08c9d78e0ac7cd864567
function getWeather(lat, lon) {
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=38438435bd1e08c9d78e0ac7cd864567&units=imperial';

    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("This here b tha data", data);
            clearSubmition();
            todayWeather(data);
        })
}

const button = document.getElementById("submit-button");
const searchBox = document.getElementById("search-box");
button.addEventListener("click", (event) => {
    console.log(searchBox.value);
    event.preventDefault();
    getLatAndLong(searchBox.value);
});

// added the ability to press the "Enter" key after a city is inputted into the Search box
searchBox.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        getLatAndLong(searchBox.value);
        return;
    }
});

function getLatAndLong(cityName) {
    console.log(cityName);
    const cityNameURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=38438435bd1e08c9d78e0ac7cd864567'
    console.log(cityNameURL);
    fetch(cityNameURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const lat = data[0].lat
            const lon = data[0].lon
            getWeather(lat, lon);
        })
}
var currentWeather = document.querySelector("#current-weather");
function todayWeather(data) {
    var currentCity = document.createElement("h2");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentCity.textContent = data.name;

    // In the lines below, Im both creating innerHTML elements so that the current weather can be displayed, AND styling different elements separate colors
    var currentTemp = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    var currentTimeLabel = document.createElement("span")
    currentTimeLabel.textContent = `Temp : `;
    currentTimeLabel.style.color = "#ff2a6d";
    var currentTempSpan = document.createElement("span");
    currentTempSpan.textContent = data.main.temp;
    currentTempSpan.style.color = "#05d9e8";
    var currentTimeDegree = document.createElement("span")
    currentTimeDegree.textContent = ` °`;
    // currentTemp.innerHTML = `Temp:   <span  class="temp-color-style">${data.main.temp}</span> °`
    currentTemp.append(currentTimeLabel, currentTempSpan, currentTimeDegree)

    var currentWind = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentWind.textContent = `Wind༄ :    ${data.wind.speed} mph`;

    var currentHumidity = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    currentHumidity.textContent = 'Humidity ♨ :' + '   ' + data.main.humidity + ' %';

    currentWeather.appendChild(currentCity);
    currentWeather.appendChild(currentTemp);
    currentWeather.appendChild(currentWind);
    currentWeather.appendChild(currentHumidity);

}

function clearSubmition() {
    currentWeather.innerHTML = "";
}


