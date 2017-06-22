//--1-- state
const state = {

   results: []

}


//--2-- function

//must include http:// protocol
var OPENWEATHER_SEARCH_URL = 'http://api.openweathermap.org/data/2.5/weather';
console.log(OPENWEATHER_SEARCH_URL);

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    appid: "b518aac4e68754c3d5ef20b99bcc6111",
  }
  $.getJSON(OPENWEATHER_SEARCH_URL, query, function(response){
   console.log(response.name); 
  });
}

function displayOpenWeatherData(data) {
  
  state.results = data.items
  renderData()
  
}

//getDataFromApi("london");


//--3-- render

function renderData() {
    console.log("rendering")
}

console.log("rendering", renderData())


//--4-- event handlers

$('.js-search-form').submit(function(event){
  event.preventDefault();

    var inputElement = $(event.currentTarget).find('.js-query');
    var inputValue = inputElement.val();
    getDataFromApi(inputValue, displayOpenWeatherData);
    inputElement.val("");

})
