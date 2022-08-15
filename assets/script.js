var weekDay = moment().format("dddd MMM Do, YYYY");
$("#currentDate").text(weekDay);

var currentTime = moment().format("hh:mm");
$("#currentTime").text(currentTime);

var GeoCodeAPIkey ="21b2bc695e4bd14a87688373d821c77c"
var apiKey = "9ab552a07c2506fa3f4d0091eda74d54"
var city;
var searchHistoryEl = document.querySelector('#searchHistory');
var cityInputEl = document.querySelector('#inputCity');
var cityListEl = document.querySelector('#cityList');
var cities = [];
var userCityEl = document.querySelector('#userCity');
var currentWindEl = document.querySelector('#windC');
var currentTempEl = document.querySelector('#tempC');
var currentUVindex = document.querySelector('#UVindexC');
var currentHumidityEl = document.querySelector('#humidityC');
var weatherCondition = document.querySelector('#weatherCondition');


//console.log(fetch(queryURL));

$("#search").on("click", function(event){
    event.preventDefault();
    var userInput = $(this).parent().children(".userInput").val();

    getCityStepOne(userInput);
    displaySeachHistory(userInput);
});


var getCityStepOne = function (userInput) {
    var queryURLGeoCode = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=" + GeoCodeAPIkey;

    fetch(queryURLGeoCode)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    userCityEl.innerHTML = data[0].name;
                    var lat = data[0].lat;
                    var long = data[0].lon;
                    // console.log(response);
                    //console.log(data);
                    getCityStepTwo(lat, long);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the weather GeoCode API ');
    });
};

var getCityStepTwo = function (lat, long) {
   
    var queryURLfree = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + long + "&exclude=&appid=" + apiKey;
    fetch(queryURLfree)
        //console.log(lat, long);
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayCurrentWeather(data);
                    //console.log(response);
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the weather API');
    });

};


function displayCurrentWeather (data) {
    currentWindEl.innerHTML = "Wind: " + Math.round(data.current.wind_speed) + " MPH";
    var Ftemp = Math.round(((data.current.temp - 273.15) * 1.8 + 32));
    currentTempEl.innerHTML = "Temperature: " + Ftemp + " °F";
    currentHumidityEl.innerHTML = "Humidity: " + data.current.humidity + " %";

    var UVindex = data.current.uvi
    currentUVindex.innerHTML = UVindex;
    if (UVindex <= 2) {
        $("#UVindexC").css("background-color", "#90ee90");
        
      } else if (3 <= UVindex >= 5) {
        $("#UVindexC").css("background-color", "#FEA95E");

      } else { UVindex >= 6 
        $("#UVindexC").css("background-color", "red");
      }    

    //console.log(userInput);
    fiveDayWeather(data);
}

function fiveDayWeather (data) {
    console.log(data);
    $("#date0").text(moment().add(1, 'days').format("MM-DD-YYYY"));
    $("#date1").text(moment().add(2, 'days').format("MM-DD-YYYY"));
    $("#date2").text(moment().add(3, 'days').format("MM-DD-YYYY"));
    $("#date3").text(moment().add(4, 'days').format("MM-DD-YYYY"));
    $("#date4").text(moment().add(5, 'days').format("MM-DD-YYYY"));

    for (let i = 0; i < 5; i++) {
        var fiveDayWindEl = $("#wind" + i);
        var fiveDayTempEl = $("#temp" + i);
        var fiveDayHumEl = $("#humidity" + i);
        var fiveDayweatherCon = $("#weatherCondition" + i);
        console.log(fiveDayweatherCon);
        fiveDayweatherCon.attr("src"," http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png")
        fiveDayWindEl.text("Wind: " + Math.round(data.daily[i].wind_speed) + " MPH");
        var Ftemp = Math.round(((data.daily[i].temp.day - 273.15) * 1.8 + 32));
        fiveDayTempEl.text("Temp: " + Ftemp + " °F");
        fiveDayHumEl.text("Humidity: " + data.daily[i].humidity + " %");
      }
}

//creating the array of lists and adding them to the list
function displaySeachHistory(userInput) {
        
    cityListEl.innerHTML = ""; 
    cities = JSON.parse(localStorage.getItem("city"));
    
    if (cities === null || cities === undefined) {
        cities =  [];
    }

    if (userInput !== null && userInput !== undefined) {
        console.log(userInput);
        cities.push(userInput); 
    } 


    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var btnHistories = document.createElement("button");
        
        btnHistories.textContent = city;
        btnHistories.classList.add("col-12");
        btnHistories.setAttribute("style", "width: 100%", "p-3");
        cityListEl.appendChild(btnHistories);
        btnHistories.setAttribute("onclick","getCityStepOne('"+city+"')");
        
      }


    localStorage.setItem("city", JSON.stringify(cities));
    
  }
displaySeachHistory();



