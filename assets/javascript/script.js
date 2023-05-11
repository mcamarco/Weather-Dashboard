var APIKey = "086f9d9aa37aee06fc531999dfe497b6";
var recentSearches = JSON.parse(localStorage.getItem('myAppData')) || [];

// event listener for city name once submitted
console.log("cityNameSubmit")
$("#language-buttons").on("click", ".btn", function () {
    var city = $(this).text();
    getWeather(city);
});
$("#submit").on("click", function (e) {
    e.preventDefault();

    var city = $("#cityName").val();
    var cityNameButton = $("<button>");
    cityNameButton.attr("class", "btn");
    cityNameButton.attr("id", "cityNamesubmit");
    cityNameButton.text(city);
    $("#language-buttons").prepend(cityNameButton);
    cityNameButton.on("click", function () {
        getWeather($(this).text());
    });

    getWeather(city);
});

// append recent searches to page as buttons - on page load from local storage
for (var i = 0; i < recentSearches.length; i++) {
    var cityNameButton = $("<button>");
    cityNameButton.attr("class", "btn");
    cityNameButton.attr("id", "cityNamesubmit");
    cityNameButton.text(recentSearches[i]);
    $("#language-buttons").append(cityNameButton);

    // Add event listener to the button
    cityNameButton.on("click", function () {
        getWeather($(this).text());
    });
}

// get weather data for city
function getWeather(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            currentWeather(lat, lon);
            forecastWeather(lat, lon);

            // add new city to recent searches array
            if (!recentSearches.includes(city)) {
                recentSearches.unshift(city);
                if (recentSearches.length > 5) {
                    recentSearches.pop();
                }
                localStorage.setItem('myAppData', JSON.stringify(recentSearches));
            }
        });
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

// Forecast weather
console.log("forecastWeather")
function forecastWeather(lat, lon) {
    $("#days").empty(); // Clear the #days element

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.list.length; i += 8) {

                // TODO: Cleanup Date Formatting
                var dateToday = $("<h2>");
                var date = new Date(data.list[i].dt_txt);
                var options = { weekday: 'long', month: 'long', day: 'numeric' };
                var formattedDate = date.toLocaleDateString(undefined, options);
                dateToday.text(formattedDate);
                $("#days").append(dateToday);

                var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                $("#days").append(forecastIcon);
                console.log(data.list[i].weather[0].icon);

                var pTemp = $("<p>");
                pTemp.text("Temperature: " + data.list[i].main.temp + " °F");
                $("#days").append(pTemp);

                var pFeelsLike = $("<p>");
                pFeelsLike.text("Feels like: " + data.list[i].main.feels_like + " °F");
                $("#days").append(pFeelsLike);

                var pHum = $("<p>");
                pHum.text("Humidity: " + data.list[i].main.humidity + " %");
                $("#days").append(pHum);
            }
            console.log("forecastWeather2")
            console.log(data)
        })
}

