var APIKey = "086f9d9aa37aee06fc531999dfe497b6";

countryCode = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW']

var userFormEl = document.getElementById("user-form")
var inputEl = document.getElementById("city-name")
var citySearchTerm = document.getElementById("city")
var historyBtns = document.querySelector(".save-buttons")
var historyContainer = document.getElementById("search-history-container")

var tempToday = document.getElementById("temp-today")
var windToday = document.getElementById("wind-today")
var humidityToday = document.getElementById("humidity-today")

var dateOne = document.getElementById("day-one")
var tempOne = document.getElementById("one-temp")
var windOne = document.getElementById("one-wind")
var humidityOne = document.getElementById("one-humidity")

var dateTwo = document.getElementById("day-two")
var tempTwo = document.getElementById("two-temp")
var windTwo = document.getElementById("two-wind")
var humidityTwo = document.getElementById("two-humidity")

var dateThree = document.getElementById("day-three")
var tempThree = document.getElementById("three-temp")
var windThree = document.getElementById("three-wind")
var humidityThree = document.getElementById("three-humidity")

var dateFour = document.getElementById("day-four")
var tempFour = document.getElementById("four-temp")
var windFour = document.getElementById("four-wind")
var humidityFour = document.getElementById("four-humidity")

var dateFive = document.getElementById("day-five")
var tempFive = document.getElementById("five-temp")
var windFive = document.getElementById("five-wind")
var humidityFive = document.getElementById("five-humidity")

var buttonArray = []

//Function handles form submission
function formSubmitHandler(event) {
    event.preventDefault()
    
    if (event.target.matches(".btn")) {
        console.log(event.target.textContent)
        var buttonCityName = event.target.textContent.split(",")[0]
        var buttonCountryName = event.target.textContent.split(",")[1]
        getTodayCityWeather(buttonCityName, buttonCountryName)
        getLonLat(buttonCityName, buttonCountryName)
        return
    }

    var userInputArr = []
    userInputArr.push(inputEl.value.split(","))
    
    var cityName = userInputArr[0][0]
    var countryName = userInputArr[0][1].trim()

    console.log(userInputArr)
    console.log(cityName)
    console.log(countryName)

    if (countryCode.includes(countryName)) {
        if (cityName && countryName) {
            getTodayCityWeather(cityName, countryName)
            getLonLat(cityName, countryName)
            inputEl.value = ""

            var buttonArray = JSON.parse(localStorage.getItem("buttonArray"))
            if (!buttonArray) {
                buttonArray = []
            } 
            buttonArray.push({cityName, countryName})
            localStorage.setItem("buttonArray", JSON.stringify(buttonArray))
            

            var savedCityBtn = document.createElement("button")
            savedCityBtn.textContent = cityName + ", " + countryName
            savedCityBtn.setAttribute("class", "btn btn-secondary")
            historyBtns.appendChild(savedCityBtn)

        } else {
            alert("Please enter a valid city name and country code")
        }
    }
    console.log(buttonArray)
}

//Function to get items from local storage and create buttons for them
function searchStorage() {
    var savedButtonArray = JSON.parse(localStorage.getItem("buttonArray"))

    if (!savedButtonArray) {
        savedButtonArray = []
    } 

    for (var i = 0; i < savedButtonArray.length; i++) {

        var savedCityName = savedButtonArray[i].cityName
        var savedCountryName = savedButtonArray[i].countryName

        var savedCityBtn = document.createElement("button")
        savedCityBtn.textContent = savedCityName + ", " + savedCountryName
        savedCityBtn.setAttribute("class", "btn btn-secondary")
        historyBtns.appendChild(savedCityBtn)
    }
}

searchStorage()

//Function handles fetching weather data for today's weather
function getTodayCityWeather(city, country) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + APIKey

    fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayTodayWeather(data, city, country)
                    // console.log(response)
                    console.log(data)
                })
            } else {
                alert("Error " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Weather API")
        })
}

//Function to display today's weather on page
function displayTodayWeather(city, searchTermCity, searchTermCountry) {

    console.log(searchTermCity + ", " + searchTermCountry + dayjs().format("YYYY-MM-DD"))
    citySearchTerm.textContent = searchTermCity + ", " + searchTermCountry + " " + dayjs().format("YYYY-MM-DD")

    var tempKelvin = city.main.temp
    var tempImperial = (((tempKelvin-273.15)*1.8)+32).toFixed(2)

    var windMeterperSec = city.wind.speed
    var windImperial = (windMeterperSec*2.237).toFixed(2)

    var icon = city.weather[0].icon
    console.log(icon)

    tempToday.textContent = "Temp: " + tempImperial + "°F"
    windToday.textContent = "Wind: " + windImperial + " MPH"
    humidityToday.textContent = "Humidity: " + city.main.humidity + "%"

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
    citySearchTerm.appendChild(weatherIcon)
}

//Function handles getting latitude and longitude of city
function getLonLat(city, country) {
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + country + "&appid=" + APIKey

    fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    getForecastCityWeather(data)
                })
            } else {
                alert("Error" + response.statusText)
                console.log(response)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Weather API")
        })
}

//Function handles fetching five-day forecast weather data 
function getForecastCityWeather(city) {
    var latitude = city[0].lat 
    var longitude = city[0].lon 

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial"

    fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayForecastWeather(data)
                    console.log(data)
                })
            } else {
                alert("Error" + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Weather API")
        })

}

//Function to display 5-day forecast on page 
function displayForecastWeather(data) {

    dateOne.textContent = data.list[3].dt_txt.split(" ")[0]
    tempOne.textContent = "Temp: " + data.list[3].main.temp + "°F"
    windOne.textContent = "Wind: " + data.list[3].wind.speed + " MPH"
    humidityOne.textContent = "Humidity: " + data.list[3].main.humidity + "%"

    var iconOne = document.createElement("img")
    iconOne.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png")
    dateOne.appendChild(iconOne)

    dateTwo.textContent = data.list[11].dt_txt.split(" ")[0]
    tempTwo.textContent = "Temp: " + data.list[11].main.temp + "°F"
    windTwo.textContent = "Wind: " + data.list[11].wind.speed + " MPH"
    humidityTwo.textContent = "Humidity: " + data.list[11].main.humidity + "%"

    var iconTwo = document.createElement("img")
    iconTwo.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[11].weather[0].icon + "@2x.png")
    dateTwo.appendChild(iconTwo)

    dateThree.textContent = data.list[19].dt_txt.split(" ")[0]
    tempThree.textContent = "Temp: " + data.list[19].main.temp + "°F"
    windThree.textContent = "Wind: " + data.list[19].wind.speed + " MPH"
    humidityThree.textContent = "Humidity: " + data.list[19].main.humidity + "%"

    var iconThree = document.createElement("img")
    iconThree.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[19].weather[0].icon + "@2x.png")
    dateThree.appendChild(iconThree)

    dateFour.textContent = data.list[27].dt_txt.split(" ")[0]
    tempFour.textContent = "Temp: " + data.list[27].main.temp + "°F"
    windFour.textContent = "Wind: " + data.list[27].wind.speed + " MPH"
    humidityFour.textContent = "Humidity: " + data.list[27].main.humidity + "%"

    var iconFour = document.createElement("img")
    iconFour.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[27].weather[0].icon + "@2x.png")
    dateFour.appendChild(iconFour)

    dateFive.textContent = data.list[35].dt_txt.split(" ")[0]
    tempFive.textContent = "Temp: " + data.list[35].main.temp + "°F"
    windFive.textContent = "Wind: " + data.list[35].wind.speed + " MPH"
    humidityFive.textContent = "Humidity: " + data.list[35].main.humidity + "%"

    var iconFive = document.createElement("img")
    iconFive.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[35].weather[0].icon + "@2x.png")
    dateFive.appendChild(iconFive)
}

//Click events
userFormEl.addEventListener("submit", formSubmitHandler)
historyContainer.addEventListener("click", formSubmitHandler)