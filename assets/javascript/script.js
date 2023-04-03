console.log(window);
var APIKey = "383165bf31a4af053f333f929519989c";
var city = "Philadelphia";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var responseText = document.getElementById('response-text');

fetch(queryURL)
    .then(function (response) {
        return response.json()
    })

function getApi(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                responseText.textContent = response.status;
            }
            return response.json();
        });
};

console.log(response);
//   getApi(requestUrl);

