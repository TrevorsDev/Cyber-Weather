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
            console.log("This here be tha location data", data);
            clearSubmition();
            todayWeather(data);
        })
}

function getLatAndLong(cityName) {
    console.log(cityName);
    const cityNameURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=38438435bd1e08c9d78e0ac7cd864567'
    fetch(cityNameURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log("This here be the city data", data);
            const lat = data[0].lat
            const lon = data[0].lon
            getWeather(lat, lon);
            getFiveDayForecast(lat, lon);
        })
}

/*creating function to grab five day forecast from an api URL
returning digestible object information. */
function getFiveDayForecast(lat, lon) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=38438435bd1e08c9d78e0ac7cd864567&units=imperial`;

    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        // .then points to that json data, the function calls upon that data or information, console.log prints it so we can view it
        .then(function (data) {
            console.log("This here b tha 5 day forecast data", data);
            /*We create a new variable called 'days'. We set it equal to a function which gives us the temps of the next five days. We do this by, calling upon the parameter 'data' which is our now neatly compiled JSON list of info, and attach the file path called 'list' which points to the location of the specific data we're looking for. There are 40 indexes within the 'list' location. We use the '.filter' method to filter the list of 40 indexes and return to us only the indexes that '.includes' the next five day forecast at '9:00:00'. */
            const days = data.list.filter((day) => day.dt_txt.includes('09:00:00'));
            /*const days = data.list.filter(function(day) {
                day.dt_txt.includes('9:00:00');
            })*/
            console.log(days);
        })
}

// Building the Five Day Forecast here.
// 1) I want to connect my five day dates, and weather criteria to my html
// 2) I want each date to show up below the five day forecast header in realtime when city is searched
// 3) I want the weather criteria to show up in realtime below dates when city is searched



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

var currentWeather = document.querySelector("#current-weather");
function todayWeather(data) {
    var currentCity = document.createElement("h2");
    //this line is gathering data from the api object thats located in the console, using the '.name' as a selector
    currentCity.textContent = `${data.name} ☼`;
    currentCity.setAttribute("class", "js-h1")

    // In the lines below, Im both creating innerHTML elements so that the current weather can be displayed, AND styling different elements separate colors
    var currentTemp = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    var currentTempLabel = document.createElement("span");
    currentTempLabel.textContent = `Temp : `;
    currentTempLabel.setAttribute("class", "pink-text");
    var currentTempSpan = document.createElement("span");
    currentTempSpan.textContent = `${data.main.temp}  °`;
    currentTempSpan.setAttribute("class", "cyan-text");
    currentTemp.append(currentTempLabel, currentTempSpan);


    var currentWind = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    var currentWindLabel = document.createElement("span");
    currentWindLabel.textContent = `Wind༄ : `;
    currentWindLabel.setAttribute("class", "pink-text");
    // currentWindLabel.style.color = "#ff2a6d";
    var currentWindSpan = document.createElement("span");
    currentWindSpan.textContent = `${data.wind.speed} mph`;
    currentWindSpan.setAttribute("class", "cyan-text");
    currentWind.append(currentWindLabel, currentWindSpan);


    var currentHumidity = document.createElement("p");
    //this line is gathering data from the api object in the console using the '.name' as a selector
    var currentHumidityLabel = document.createElement("span");
    currentHumidityLabel.textContent = `Humidity ♨ :`;
    currentHumidityLabel.setAttribute("class", "pink-text");
    var currentHumiditySpan = document.createElement("span");
    currentHumiditySpan.textContent = `${data.main.humidity} %`;
    currentHumiditySpan.setAttribute("class", "cyan-text");
    currentHumidity.append(currentHumidityLabel, currentHumiditySpan);

    // currentHumidity.textContent = 'Humidity ♨ :' + '   ' + data.main.humidity + ' %';

    currentWeather.appendChild(currentCity);
    currentWeather.appendChild(currentTemp);
    currentWeather.appendChild(currentWind);
    currentWeather.appendChild(currentHumidity);

}

// erases current weather search so that the function can run and populate the next weather search
function clearSubmition() {
    currentWeather.innerHTML = "";
}


