//--1-- state
const state = {

    view: ".js-starting-form",
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

//separate renderview and renderdata
if (state.view === '.js-starting-form') {
  	$('.js-starting-form').show()
    $('.js-search').hide()
    $('.js-result-display').hide()
    $('.js-result-details').hide()
} else if (state.view === '.js-search') {
  	$('.js-starting-form').hide()
    $('.js-search').show()
    $('.js-result-display').hide()
    $('.js-result-details').hide()
} else if (state.view === '.js-result-display') {
  	$('.js-starting-form').hide()
    $('.js-search').hide()
    $('.js-result-display').show()
    $('.js-result-details').hide()
} else if (state.view === '.js-result-details') {
  	$('.js-starting-form').hide()
    $('.js-search').hide()
    $('.js-result-display').hide()
    $('.js-result-details').show()
}

	var searchResults = "";
	var searchResultsTitle = `<h1>Results for ${state.results.list[0]['name']}</h1>`;
  var displayResultsTitle = `<h1>${state.results.list[0]['name']}</h1>`;
	for (var prop in state.results.list) {
		searchResults += (`
            <li>${state.results.list[prop].name}, ${state.results.list[prop]['sys']['country']}</li>`);
	};


	$('.js-search-results').html(searchResultsTitle);
	$('.js-list-items').html(searchResults);
  $('.js-result-display h1').html(displayResultsTitle);
  $('.js-result-details h1').html(displayResultsTitle);
}



//--4-- event handlers

$('.js-search-form').submit(function(event){
    event.preventDefault();
    state.view = ".js-search"
    //state.view = ".js-search"
    // $(".js-search").removeClass(".hidden")
    // $(".js-result-form").addClass(".hidden")
    console.log("go button")
    var inputElement = $(event.currentTarget).find('.js-query');
    var inputValue = inputElement.val();
    getDataFromApi(inputValue, displayOpenWeatherData);
    inputElement.val("");
})

$('.more-info').on('click', function(event) {
		event.preventDefault();
    console.log("clicked more info")
    $('.js-starting-form').hide()
    $('.js-result-display').hide()
    $('.js-result-details').show()
	})

$('.start-over').on('click', function(event) {
		event.preventDefault();
    console.log("clicked start over")
		state.view = ".js-starting-form"
    $('.js-starting-form').show()
    $('.js-search').hide()
    $('.js-result-display').hide()
    $('.js-result-details').hide()
	})

$('.js-list-items').on('click', function(event) {
		event.preventDefault();
    console.log("clicked list")
		state.view = ".js-result-display"
    $('.js-search').hide()
    $('.js-result-display').show()
	})


//turn result items into clickable links render
//event handlers for start over button (listen to parent)
//event handlers for more info button (listen to parent)
//degrees F and C 