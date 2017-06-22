//--1-- state
const state = {

   results: []

}


//--2-- function

//must include http:// protocol
var OPENWEATHER_SEARCH_URL = 'http://api.openweathermap.org/data/2.5/find';

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    appid: "b518aac4e68754c3d5ef20b99bcc6111",
  }
  $.getJSON(OPENWEATHER_SEARCH_URL, query, function(response){
   displayOpenWeatherData(response);
   renderData();
  });
}

function displayOpenWeatherData(data) {
  state.results = data;
  console.log(state.results);
}

//getDataFromApi("london");


//--3-- render

function renderData() {
	var searchResults = "";
	var searchResultsTitle = "";
	for (var prop in state.results) {
		searchResults += (`
            <p>${state.results.list.name}, ${state.results[prop]['list']['sys']['country']}</p>`);
		searchResultsTitle += (`
						<h3>Results for ${state.results[prop]['name']}</h3>`);
	};
	$('.js-search-results').html(searchResultsTitle);
	$('.js-list-items').html(searchResults);

}



//--4-- event handlers

$('.js-search-form').submit(function(event){
  	event.preventDefault();

    var inputElement = $(event.currentTarget).find('.js-query');
    var inputValue = inputElement.val();
    getDataFromApi(inputValue, displayOpenWeatherData);
    inputElement.val("");

})

