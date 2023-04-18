var APIKey = "086f9d9aa37aee06fc531999dfe497b6";
var storedData = JSON.parse(localStorage.getItem('myAppData')) || [];


console.log(window);

// TODO: event listener for city name submit
$("#submit").on("click", function(e){
    e.preventDefault();

    var city = $("#cityName").val();
    getCoord(city);
})

// get coordinates for city
function getCoord(city)
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
    .then(function(res){
       return res.json();
    })
    .then(function(data){
        //console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        currentWeather(lat, lon);
        forecastWeather(lat,lon);
        
        
    })
}

// current weather
function currentWeather(lat, lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
    .then(function(res){
        return res.json();
     })
     .then(function(data){
         console.log(data);
         var pHum = $("<p>");
         pHum.text("Humidity: " + data.main.humidity);
         $("#current").append(pHum);
     })
}

// forecast weather
function forecastWeather(lat, lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&appid=${APIKey}`)
    .then(function(res){
        return res.json();
     })
     .then(function(data){
         console.log(data);
         // TODO: append forecast data to HTML
     })
}


//     // push zipcode to local storage
//     storedData.unshift(zipCode);
//     localStorage.setItem('myAppData', JSON.stringify(storedData));
//     zipButtons();
// });



// parse data from Array

// set data to points on HTML

