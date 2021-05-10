var temperature;

function displayLocation(latitude,longitude) {
  var request = new XMLHttpRequest();
  var method = 'GET';
  var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200){
      var data = JSON.parse(request.responseText);
      if (data) {
        var time = getHourWithoutZeros(new Date());
        var colorOne = '#f09d86';
        var colorTwo = '#f8d476';
        if (time >= 17) { // 24hour format
          colorOne = '#2c526f';
          colorTwo = '#4b4175';
        }
        temperature = data.main.temp;
        document.getElementsByClassName('city')[0].innerHTML = data.name;
        document.getElementsByClassName('country')[0].innerHTML = data.sys.country;
        document.getElementsByClassName('temperature')[0].innerHTML = data.main.temp+' °C'
        document.getElementsByClassName('weather-icon')[0].src = data.weather[0].icon;
        document.getElementsByClassName('weather-icon')[0].alt = data.weather[0].main;
        document.getElementsByClassName('weather-wrapper')[0].style.backgroundImage = 'linear-gradient(to bottom right, ' + colorOne + ', ' + colorTwo + ')';
      }
    }
  };
  request.send();
};

 function initializeGeolocation() {
  var successCallback = function(position){
    var x =  position.coords.latitude;
    var y =  position.coords.longitude;
    displayLocation(x,y);
  };
  
  var errorCallback = function(error){
    var errorMessage = 'Unknown error';
    switch(error.code) {
      case 1:
        errorMessage = 'Permission denied';
        break;
      case 2:
        errorMessage = 'Position unavailable';
        break;
      case 3:
        errorMessage = 'Timeout';
        break;
    }
    alert(errorMessage);
  };
  
  var options = {
    enableHighAccuracy: true,
    timeout: 2000,
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

function toggleTemperature() {
  var farenheight;
  var celcius = temperature;
  if (celcius) {
    var checkbox = document.getElementById('temp-toggle');
    if (checkbox.checked) {
      farenheight = (celcius * 1.8) + 32;
      document.getElementsByClassName('temperature')[0].innerHTML = parseInt(farenheight, 10) + ' °F'
    } else {
      document.getElementsByClassName('temperature')[0].innerHTML = celcius + ' °C'
    }
  }
}

function getHourWithoutZeros(dt) 
{ 
  return dt.getHours();
}

initializeGeolocation();
