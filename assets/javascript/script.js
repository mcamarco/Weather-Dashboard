console.log(window);

var APIKey = "383165bf31a4af053f333f929519989c";
var city= "NYNYUSA";
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "New York" + "NY" + "USA" +"&appid=" + APIKey;

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

console.log(queryURL);



// TODO: You'll want to allow your application to accept user input and store it in the variable that you've created. You'll also likely need to specify state and country variables in your API call, as multiple countries or states might have cities with the same name. For the purposes of this guide, you can use the city variable that you just created.

let response = fetch(url);

fetch(queryURL)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    });
console.log(response);
//  TODO: use the URL associated with Current Weather Data -- The OpenWeather Current Weather Data documentation provides an example of how to make an API call using just the city name, as shown in the following code:
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

