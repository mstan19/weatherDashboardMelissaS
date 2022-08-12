var weekDay = moment().format("dddd MMM Do, YYYY");
$("#currentDate").text(weekDay);

var currentTime = moment().format("hh:mm");
$("#currentTime").text(currentTime);

var apiKey = "9ab552a07c2506fa3f4d0091eda74d54"
var city;
var searchHistoryEl = document.querySelector('#searchHistory');
var cityInputEl = document.querySelector('#inputCity');
var cityListEl = document.querySelector('#cityList');
var cities = [];
// var currentWindEl = document.querySelector('#wind');
//console.log(fetch(queryURL));

$("#search").on("click", function(event){
    event.preventDefault();
    // if (city) {
    //     getCity(city);
    // cityInputEl.value = '';
    // } else {
    //   alert('Please Enter A City');
    // }

    var userInput = $(this).parent().children(".userInput").val();

    getCity(userInput);

});


var getCity = function (userInput) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // displayCurrentWeather(data, city);
                   // console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the weather API');
    });

    // displayCurrentWeather (city);
    displaySeachHistory(userInput);
};

// function displayCurrentWeather (city) {
//     currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
// }

//creating the array of lists and adding them to the list

function displaySeachHistory(userInput) {
    // cityListEl.innerHTML = "";
    
    //console.log(userInput);

    
   
    cities.push(userInput);       
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
  
      var li = document.createElement("li");
      li.textContent = city;
 
      searchHistoryEl.appendChild(li);

    }
    localStorage.setItem("city", JSON.stringify(cities));
    var storedListofCities = JSON.parse(localStorage.getItem("city"));
    

//console.log(storedListofCities);

  }
 // var storedListofCities = JSON.parse(localStorage.getItem("city"));
 //$("#cityList").textContent = (storedListofCities);
// console.log(typeof(storedListofCities));
//document.getElementById('#cityList').innerHTML = storedListofCities[0]['city'];
// var storedListofCities = JSON.parse(localStorage.getItem("city"));
// var btnSearchEl = document.createElement("button");
// searchHistoryEl.textContent = storedListofCities;
// storedListofCities.;

// searchHistoryEl.setAttribute("data-city", storedListofCities)

// searchHistoryEl.prepend(btnSearchEl);
// var x = $("#cityList").text(storedListofCities[0]);
// var x = $("#cityList").text(storedListofCities[1]);
// var x = $("#cityList").text(storedListofCities[2]);
// var x = $("#cityList").text(storedListofCities[3]);

//console.log(storedListofCities[0]);