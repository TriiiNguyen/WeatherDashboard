//VARIABLES 
var apiKey = '8fab93999285be91eb63c5955179ec1f';

var searchBtn = document.getElementById('btn-search');

var cityName = document.getElementById('search-city');




//FUNCTIONS 


function getLatLon() {
  console.log("testing button click");



  var geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${apiKey}`;

  console.log("geocodingURL", geocodingURL);
  //fetch request that will call geocoding


  fetch(geocodingURL)
    .then(function (response) {
      //console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log("APi Data", data);
      console.log(data[0].lat, data[0].lon);

      oneCallWeather(data[0].lat, data[0].lon);
    })

}

// base on its ans u will pass lat & lon to the onecallapi 
function oneCallWeather(lat, lon) {
  var oneweatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

  console.log("onecall url", oneweatherURL);
  //fetch request one call
  fetch(oneweatherURL)
    .then(function (oneCallResponse) {
      return oneCallResponse.json()
    })
    .then(function (weatherData) {
      console.log("One Call Data", weatherData); 

      //Display all the data on the hTML page 
      document.getElementById('currentCity').textContent = cityName.value; 
      document.getElementById('currentTemp').textContent = weatherData.current.temp;
      document.getElementById('currentHumidity').textContent = weatherData.current.humidity;
      document.getElementById('currentWind').textContent = weatherData.current.wind_speed;
      document.getElementById('currentUV').textContent = weatherData.current.uvi;


      //Display FORECAST 
      document.getElementById('card1').textContent = weatherData.daily[0].uvi;
      console.log("Day 1", weatherData.daily[0]);
      console.log("Day 2", weatherData.daily[1]);

      //forloop count reaches five 

    })
}

//EVENT LISTINER 
searchBtn.addEventListener('click', getLatLon)