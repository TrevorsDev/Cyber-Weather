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
var futureTemps = document.querySelectorAll(".future-temp");
var futureWind = document.querySelectorAll(".future-wind");
var futureHumidity = document.querySelectorAll(".future-humidity");

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

function getLatAndLon(cityName) {
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

// Building the Five Day Forecast here.
// 1) I want to connect my five day dates, and weather criteria to my html
// 2) I want each date to show up below the five day forecast header in realtime when city is searched
// 3) I want the weather criteria to show up in realtime below dates when city is searched

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

            // the three lines below populate the 5day temps forecast
            for (var i = 0; i < futureTemps.length; i++) {
                futureTemps[i].textContent = ` ${days[i].main.temp} °`;
            }

            // the three lines below populate the 5day wind forecast
            for (var i = 0; i < futureWind.length; i++) {

                futureWind[i].textContent = ` ${days[i].wind.speed} mph`;
            }

            // three lines below populate the 5day humidity
            for (var i = 0; i < futureHumidity.length; i++) {

                futureHumidity[i].textContent = ` ${days[i].main.humidity} %`;
            }
        })
}

// creating a hisotry log of searched cities in nav bar here:
// 1) As a user, I want to display searched cities in the nav bar below the submit button
// 2) I need to create elements to populate the area below by using empty section tags and attaching JS buttons to fill when a city is searched
// 3) I need each new search to iterate through and add buttons to a new section tag
// 4) When a city is searched, it passes onto the button
// 5) Have a varriable that stores the searched cities inside of an array

const recordButton = document.getElementById("generated-cities");
//  I want recordButton to return and display the searchBox city

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
const button = document.getElementById("submit-button");
const searchBox = document.getElementById("search-box");
button.addEventListener("click", (event) => {
    if (!searchHistory.includes(searchBox.value)) {
        searchHistory.push(searchBox.value);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    console.log(searchBox.value);
    event.preventDefault();
    getLatAndLon(searchBox.value);
    buttonGenerator();
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
        if (!searchHistory.includes(searchBox.value)) {
            searchHistory.push(searchBox.value);
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
        console.log(searchBox.value);
        event.preventDefault();
        getLatAndLon(searchBox.value);
        buttonGenerator();
    }
});

//Now I need to have a button created each time a search is performed, with the city of the search inside. 
//Ill need a new function which creates a new button element, when city is searched
// I search a city, that city is saved into an array in local storage, a button is generated on the click or press of 'Enter', within that button the searchBox.value is saved, a loop is generated so that a certain number of buttons are saved to the navigation bar 
// Were calling the function twice. Once at the start with no local storage and once upon each city search

function buttonGenerator() {
    recordButton.innerHTML = '';
    for (var i = 0; i < searchHistory.length; i++) {
        var savedCityButton = document.createElement("button");
        savedCityButton.textContent = searchHistory[i];
        savedCityButton.classList.add('savedCityButton')
        savedCityButton.addEventListener('click', (event) => {
            getLatAndLon(event.target.textContent);
        });
        recordButton.append(savedCityButton)
        if (i === 6) {
            break;
        }
    }
}

buttonGenerator();

// const button = document.getElementById("submit-button");
// const searchBox = document.getElementById("search-box");
button.addEventListener("click", (event) => {
    console.log(searchBox.value);
    event.preventDefault();
    getLatAndLon(searchBox.value);
});

// added the ability to press the "Enter" key after a city is inputted into the Search box
searchBox.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        getLatAndLon(searchBox.value);
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
    currentHumiditySpan.textContent = `${data.main.humidity} %`;
    currentHumiditySpan.setAttribute("class", "cyan-text");
    currentHumidity.append(currentHumidityLabel, currentHumiditySpan);

    currentWeather.appendChild(currentCity);
    currentWeather.appendChild(currentTemp);
    currentWeather.appendChild(currentWind);
    currentWeather.appendChild(currentHumidity);

}

// erases current weather search so that the function can run and populate the next weather search
function clearSubmition() {
    currentWeather.innerHTML = "";
}


