var weekDay = moment().format("dddd MMM Do, YYYY");
$("#currentDate").text(weekDay);

var currentTime = moment().format("hh:mm");
$("#currentTime").text(currentTime);

var apiKey = "9ab552a07c2506fa3f4d0091eda74d54"
var city;
var searchHistoryEl = document.querySelector('#searchHistory');
var cityInputEl = document.querySelector('#inputCity');
//console.log(fetch(queryURL));

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = cityInputEl.value.trim();
  
    if (city) {
      getCity(city);
  
    //   repoContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please Enter A City');
    }
  };

var getCity = function (city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCity(data, city);
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

$(".btn").on("click", function(event){
    event.preventDefault();
    var userInput = $(this).parent().children(".userInput").val();
    console.log(userInput);
    var city = $(this).parent("#serach").text();
    console.log(city);
    localStorage.setItem("city", userInput);

    $("#serach").val(localStorage.getItem("city"));

});


//getCity("new york");

// var displayCity = function (city) {
//     if (city.length === 0) {
//         searchHistoryEl.textContent = "No City found";
//         return;
//       } else {}
// };
