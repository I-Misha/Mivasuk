function init() {
    getWeatherFromOpenWeatherMap(getCityName());
}

function getWeatherFromOpenWeatherMap(cityCode) {
    $.when(getOpenWeatherMapAjax(cityCode)).done(function (response) {
      buidCityComponent(handleOpenWeatherMap(response));
    });
}

function buidCityComponent(weatherStructure) {
    console.log('day ' + JSON.stringify(weatherStructure));
    let body = '';
    for (let i = 0; i < weatherStructure.weatherStructures.length; i++) {
        let singleDay = weatherStructure.weatherStructures[i];
        body += 
        '<li><i class="day-icon" data-feather="cloud"></i><span class="day-name">' + singleDay.dt + '</span><span class="day-temp">' + singleDay.dayT + '</span></li>';
    }
    $("#weatherContainer").append(
        '<div class="weather-side">' +
        '<div class="weather-gradient"></div>' +
        '<div class="date-container">' + 
        '<h2 class="date-dayname">Tuesday</h2><span class="date-day">' + weatherStructure.dt + '</span><i class="location-icon" data-feather="map-pin"></i><span class="location">' + getCityName() +'</span>' +
        '</div>' + 
        '<div class="weather-container"><i class="weather-icon" data-feather="sun"></i>' +
        '<h1 class="weather-temp">' + weatherStructure.temp + ' </h1>' + 
        '<h3 class="weather-desc">' + weatherStructure.main + '</h3>' +
        '</div>' + 
        '</div>' +
        '<div class="info-side">' + 
        '<div class="today-info-container">' + 
        '<div class="today-info">' + 
        '<div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">0 %</span>' + 
        '<div class="clear"></div>' + 
        '</div>' + 
        '<div class="humidity"> <span class="title">HUMIDITY</span><span class="value">34 %</span>' +
        '<div class="clear"></div>' +
        ' </div>' + 
        '<div class="wind"> <span class="title">WIND</span><span class="value">0 km/h</span>' + 
        '<div class="clear"></div>' +
        '</div>' + 
        '</div>' + 
        '</div>' + 
        '<div class="week-container">' +
        '<ul class="week-list">' + 
        '<li class="active"><i class="day-icon" data-feather="sun"></i><span class="day-name">Tue</span><span class="day-temp">29°C</span></li>' +
        body +
        '<div class="clear"></div>' + 
        '</ul>' + 
        '</div>' + 
        '<div class="location-container"><button class="location-button"> <i data-feather="map-pin"></i><span>Change location</span></button></div>' +
        '</div>' + 
        '</div>'
    );
}

function getOpenWeatherMapAjax(sity) {
  return $.ajax({
    async: true,
        crossDomain: true,
        url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=" + sity + "&units=metric",
        method: "GET",
        headers: {
            "x-rapidapi-key": "6dad749391msh5b9bb5a9ee9b87bp1df667jsnc6efbec6ad9b",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
  });
}

function handleOpenWeatherMap(response) {
  let city = response.city;
  let dailyWeathers = response.list;
  let ws = {}
  let weatherStructures = [];
  ws.city = getCityName();
  ws.temp = dailyWeathers[0].temp.day;
  ws.main = dailyWeathers[0].weather[0].main;
  ws.dt = convertUnixTimeStampDay(dailyWeathers[0].dt - Math.abs(city.timezone));
    for (let i = 0; i < dailyWeathers.length; i++) {
        let element = dailyWeathers[i];
        let weatherStructure = {};
        weatherStructure.weatherType = element.weather[0].main;
        weatherStructure.sunrise = convertUnixTimeStamp(element.sunrise - Math.abs(city.timezone));
        weatherStructure.sunset = convertUnixTimeStamp(element.sunset - Math.abs(city.timezone));
        weatherStructure.dt = convertUnixTimeStampDay(element.dt - Math.abs(city.timezone));
        weatherStructure.dayT = element.temp.day;
        weatherStructure.maxT = element.temp.max;
        weatherStructure.minT = element.temp.min;
        weatherStructure.nightT = element.temp.night;
        weatherStructure.eveT = element.temp.eve;
        weatherStructure.mornT = element.temp.morn;
        weatherStructure.windSpeed = element.speed;
        weatherStructures.push(weatherStructure);
    }
    ws.weatherStructures = weatherStructures;
    return ws;
}

function convertUnixTimeStampDay(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getYear();
  }

function convertUnixTimeStamp(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  
    return formattedTime;
  }

  function getCityName() {
    var url = new URL(window.location.href);
    var c = url.searchParams.get("cityName");
    return c;
  }