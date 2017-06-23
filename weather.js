//--1-- state
const state = {

  //selected city property
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
  $.getJSON(OPENWEATHER_SEARCH_URL, query, function (response) {
    displayOpenWeatherData(response);
    renderData();
  });
}


function displayOpenWeatherData(data) {
  state.results = data;

  function convertDegrees() {

    var kelvin = state.results.list[0].main.temp
    function convertToF() {
      var fDegrees = Math.floor(((kelvin - 273.15) * 1.8) + 32) + " degrees Fahrenheit"
      $('.js-degrees-fahrenheit').text(fDegrees);
    }
    convertToF()
    function convertToC() {
      var cDegrees = Math.floor(kelvin-273.15) + " degrees Celsius"
      $('.js-degrees-celsius').text(cDegrees);
    }
    convertToC()
  }
  convertDegrees()


}

function findImage() {
  var displayImage = ""

  if (state.results.list[0].weather[0].description.includes("clear")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/jLfC1gJfqMyZO/giphy.gif">
    <h3>The weather is sunny</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("cloud")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/osXVD7sb6C8eI/giphy.gif">
    <h3>The weather is cloudy</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("rain")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/vMRDAT7oqbMfm/giphy.gif">
    <h3>It's rainy</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("thunder")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/26uf5HjasTtxtNCqQ/giphy.gif">
    <h3>There are thunderstorms</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("snow")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/7zUvkN7hNQiK4/giphy.gif">
    <h3>It's snowing</h3>`
  }
  else {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/107udTe1LbQUvK/giphy.gif"> 
    <h4>Weather Unknown At This Time</h4>`
  }
  return displayImage
}




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

$('.js-search-form').submit(function (event) {
  event.preventDefault();
  state.view = ".js-search"
  //state.view = ".js-search"
  // $(".js-search").removeClass(".hidden")
  // $(".js-result-form").addClass(".hidden")
  var inputElement = $(event.currentTarget).find('.js-query');
  var inputValue = inputElement.val();
  getDataFromApi(inputValue, displayOpenWeatherData);
  inputElement.val("");
})

$('.more-info').on('click', function (event) {
  event.preventDefault();
  $('.js-starting-form').hide()
  $('.js-result-display').hide()
  $('.js-result-details').show()
})

$('.start-over').on('click', function (event) {
  event.preventDefault();
  state.view = ".js-starting-form"
  $('.js-starting-form').show()
  $('.js-search').hide()
  $('.js-result-display').hide()
  $('.js-result-details').hide()
})

$('.js-list-items').on('click', function (event) {
  event.preventDefault();
  state.view = ".js-result-display"
  var displayImage = findImage()
  $('.weather-image').html(displayImage)
  $('.js-search').hide()
  $('.js-result-display').show()
})

$('.less-info').on('click', function (event) {
  event.preventDefault();
  $('.js-starting-form').hide()
  $('.js-result-display').show()
  $('.js-result-details').hide()
})


//what EH should do: receive info from the dom.. change the state.. then run render function

//turn result items into clickable links render
//event handlers for start over button (listen to parent)
//event handlers for more info button (listen to parent)
//degrees F and C 