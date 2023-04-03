console.log(window);

var APIKey = "383165bf31a4af053f333f929519989c";
var city="New York";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);

