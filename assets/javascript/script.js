
console.log(window);
// Set Variables
var APIKey = "383165bf31a4af053f333f929519989c";
var city;

// for testing purposes
 city = "philadelphia";
 console.log("CITY NAME: " + city);

//  API Query
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
console.log("API QUERY: " + queryURL);

// call API
fetch(queryURL)
    .then(function (response) {
        console.log(response)
        return response.json()
    })

// parse data from Array

// set data to points on HTML

