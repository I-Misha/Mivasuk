function init() {
    getWeatherFromOpenWeatherMap('New York');
    //getWeatherFromOpenWeatherMap('London');
    //getWeatherFromOpenWeatherMap('Molodkiv');
    //getWeatherFromOpenWeatherMap('Tokio');
    //getWeatherFromOpenWeatherMap('Mexico City');
}

function getWeather() {
    var cityName = document.getElementById("cityName").value;
    getWeatherFromOpenWeatherMap(cityName);
}

function validateInput(cityName) {
    if (!cityName) alert('Input city Name pls');
    else cityName
}

function buidCityComponent(weatherStructure) {
    let weatherIcon = '';
    if (weatherStructure.weatherType === 'Clouds') {
        weatherIcon = getCloudyIcon();
    } else if (weatherStructure.weatherType === 'Clear') {
        weatherIcon = getSunnyIcon();
    } else if (weatherStructure.weatherType === 'Rain') {
        weatherIcon = getStormyIcon();
    } else {
        weatherIcon = getBreezyIcon();
    }
    let cityName = weatherStructure.cityName;
    $("#weatherContainer").append(
        '<article class="box weather">' +
            '<a href="singleCity.html?cityName=' + weatherStructure.cityName + '">' + cityName + '</a>' +
            '<div class="icon bubble black">' +
                weatherIcon + 
            '</div>' +
            '<h1>' + weatherStructure.windSpeed + '</h1>' +
            '<span class="temp">' + weatherStructure.temperature + '&deg;</span>' +
            '<span class="high-low">' + weatherStructure.sunrise + '&deg;/ ' + weatherStructure.sunset + '&deg;</span>' +
        '</article>'
      );
}

function getSunnyIcon() {
    return '<div class="hot weathericon">' + 
                '<div class="spin">' +
                    '<span class="sun"></span>' +
                    '<span class="sunx"></span>' +
                '</div>' + 
            '</div>';
}

function getCloudyIcon() {
    return '<div class="cloudy weathericon">' +
                '<div class="spin">' +
                    '<span class="cloud"></span>' +
                    '<span class="cloudx"></span>' +
                '</div>' +
            '</div>';
}

function getNightIcon() {
    return '<div class="night weathericon">'  +
                '<div class="spin">' +
                    '<span class="moon"></span>' +
                    '<span class="spot1"></span>' +
                    '<span class="spot2"></span>' +
                    '<ul> <li></li><li></li><li></li><li></li><li></li> </ul>' +
                '</div>' +
            '</div>';
}

function getStormyIcon() {
    return '<div class="stormy weathericon">' +
                '<div class="spin">' +
                    '<ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>' +
                    '<span class="snowe"></span>' +
                    '<span class="snowex"></span>' +
                    '<span class="stick"></span>' +
                    '<span class="stick2"></span>' +
                '</div>' +
            '</div>';
}

function getBreezyIcon() {
    return '<div class="breezy weathericon">' +
                '<div class="spin">' +
                    ' <ul> <li></li><li></li><li></li><li></li><li></li> </ul>' +
                    '<span class="cloudr"></span>' +
                '</div>'+
            '</div>';
}

function getWeatherFromOpenWeatherMap(cityCode) {
  $.when(getOpenWeatherMapAjax(cityCode)).done(function (response) {
    buidCityComponent(handleOpenWeatherMap(response, "OpenWeatherMap"));
  });
}

function handleResponse(response, apiName) {
  if (apiName === "OpenWeatherMap") {
    return handleOpenWeatherMap(response);
  } else if (apiName === "notOpenWeatherMap") {
  }
}

function getOpenWeatherMapAjax(sity) {
    console.log('asdfs');
  return $.ajax({
    async: true,
    crossDomain: true,
    url:
      "https://community-open-weather-map.p.rapidapi.com/weather?q=" + sity,
    headers: {
      "x-rapidapi-key": "6dad749391msh5b9bb5a9ee9b87bp1df667jsnc6efbec6ad9b",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  });
}

function handleOpenWeatherMap(response) {
    console.log('response ' + JSON.stringify(response));
  let weatherStructure = {};
  weatherStructure.cityName = response.name;
  weatherStructure.weatherType = response.weather[0].main;
  console.log('weatherStructure.weatherType ' + weatherStructure.weatherType);
  weatherStructure.windSpeed = response.wind.speed;
  weatherStructure.sunrise = this.convertUnixTimeStamp(response.sys.sunrise);
  weatherStructure.sunset = this.convertUnixTimeStamp(response.sys.sunset);
  weatherStructure.localTime = this.convertUnixTimeStamp(response.dt);
  weatherStructure.temperature = this.convertKelvins(response.main.temp);
  return weatherStructure;
}

function convertKelvins(kelvins) {
  return Math.round((kelvins - 273.15) * 100) / 100 ;;
}

function convertUnixTimeStamp(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
}
