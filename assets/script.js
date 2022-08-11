var weekDay = moment().format("dddd MMM Do, YYYY");
$("#currentDate").text(weekDay);

var currentTime = moment().format("hh:mm");
$("#currentTime").text(currentTime);

var apiKey = "9ab552a07c2506fa3f4d0091eda74d54"

var city = "atlanta";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
console.log(fetch(queryURL));