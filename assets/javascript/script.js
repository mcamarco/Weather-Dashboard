var APIKey = "62f12928e4bb4b706baabee5c050c6f0";
var storedData = JSON.parse(localStorage.getItem('myAppData')) || [];
var recentSearches = storedData.recentSearches || [];

// event listener for city name submit
console.log("cityNameSubmit")
$("#submit").on("click", function (e) {
    e.preventDefault();

    var city = $("#cityName").val();
    getCoord(city);
})

// get coordinates for city
console.log("getCoord")
function getCoord(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            currentWeather(lat, lon);
            // forecastWeather(lat,lon);

            // add new city to recent searches array
            recentSearches.unshift(city);
            if (recentSearches.length > 5) {
                recentSearches.pop();
            }
            localStorage.setItem('myAppData', JSON.stringify({ recentSearches: recentSearches }));

            // update buttons for recent searches
            $("#language-buttons").empty();
            for (var i = 0; i < recentSearches.length; i++) {
                var cityNameButton = $("<button>");
                cityNameButton.attr("class", "btn");
                cityNameButton.attr("id", "cityNamesubmit");
                cityNameButton.text(recentSearches[i]);
                $("#language-buttons").append(cityNameButton);
            }

        })
}

// get current weather
console.log("currentWeather")
function currentWeather(lat, lon) {
    $("#current").empty();

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var pcityname = $("<h3>");
            pcityname.text(data.name);
            $("#current").append(pcityname);

            var pTemp = $("<p>");
            pTemp.text("Temperature: " + data.main.temp + " °F");
            $("#current").append(pTemp);

            var pFeelsLike = $("<p>");
            pFeelsLike.text("Feels like: " + data.main.feels_like + " °F");
            $("#current").append(pFeelsLike);

            var pHum = $("<p>");
            pHum.text("Humidity: " + data.main.humidity + " %");
            $("#current").append(pHum);


        })
}


// TODO: Forecast weather
console.log("forecastWeather")
// function forecastWeather(lat, lon)
// {
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&appid=${APIKey}`)
//     .then(function(res){
//         return res.json();
//      })
//     .then(function(data){
//         var pcityname = $("<h2>");
//         pcityname.text(data.name);
//         $("#current").append(pcityname);

//         var pTemp = $("<p>");
//         pTemp.text("Temperature: " + data.main.temp + " °F");
//         $("#current").append(pTemp);

//         var pFeelsLike = $("<p>");
//         pFeelsLike.text("Feels like: " + data.main.feels_like + " °F");
//         $("#current").append(pFeelsLike);

//         var pHum = $("<p>");
//         pHum.text("Humidity: " + data.main.humidity + " %");
//         $("#current").append(pHum);

//     })
// }

// append recent searches to page
for (var i = 0; i < recentSearches.length; i++) {
    var cityNameButton = $("<button>");
    cityNameButton.attr("class", "btn");
    cityNameButton.attr("id", "cityNamesubmit");
    cityNameButton.text(recentSearches[i]);
    $("#language-buttons").append(cityNameButton);
}

