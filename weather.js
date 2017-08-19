//--1-- state
const state = {  
  view: ".js-starting-form",
  results: []
}

//--2-- function
var OPENWEATHER_SEARCH_URL = 'https://api.openweathermap.org/data/2.5/find';
function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    appid: "b518aac4e68754c3d5ef20b99bcc6111",
  }
  $.getJSON(OPENWEATHER_SEARCH_URL, query, function (response) {
    displayOpenWeatherData(response);
    render();
  });
}


function displayOpenWeatherData(data) {
  state.results = data;
  function convertDegrees() {
    var kelvin = state.results.list[0].main.temp
    function convertToF() {
      var fDegrees = Math.floor(((kelvin - 273.15) * 1.8) + 32) + " Degrees Fahrenheit"
      $('.js-degrees-fahrenheit').text(fDegrees);
    }
    convertToF()
    function convertToC() {
      var cDegrees = Math.floor(kelvin-273.15) + " Degrees Celsius"
      $('.js-degrees-celsius').text(cDegrees);
    }
    convertToC()
  }
  convertDegrees()
}

function findImage() {
  var displayImage = ""
  if (state.results.list[0].weather[0].description.includes("clear"))  {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/jLfC1gJfqMyZO/giphy.gif">
    <h3>It's sunny</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("Clear"))  {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/jLfC1gJfqMyZO/giphy.gif">
    <h3>It's sunny</h3>`
  }
  else if (state.results.list[0].weather[0].description.includes("cloud")) {
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/osXVD7sb6C8eI/giphy.gif">
    <h3>It's cloudy</h3>`
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
    displayImage = `<img class = "image-size" src="https://media.giphy.com/media/nVTa8D8zJUc2A/giphy.gif"> 
    <h4>Weather Unknown At This Time</h4>`
  }
  return displayImage
}

//--3-- render
function render() {

  function renderView() {
  if (state.view === '.js-search') {
      $('.js-starting-form').hide()
      $('.js-search').show()
    } else if (state.view === '.js-result-display') {
      $('.js-search').hide()
      $('.js-result-display').show()
    } else if (state.view === '.js-result-details') {
      $('.js-result-display').hide()
      $('.js-result-details').show()
    }
  }
  renderView();

  function renderData() {
    var searchResults = "";
    var searchResultsTitle = `<h1>Results for ${state.results.list[0]['name']}</h1>`;
    var displayResultsTitle = `<h1>${state.results.list[0]['name']}</h1>`;
    for (var prop in state.results.list) {
      searchResults += (`
              <p>${state.results.list[prop].name}, ${state.results.list[prop]['sys']['country']}</p>`);
    };
    $('.js-search-results').html(searchResultsTitle);
    $('.js-list-items').html(searchResults);
    $('.js-result-display h1').html(displayResultsTitle);
    $('.js-result-details h1').html(displayResultsTitle);
  }
  renderData();
}

//--4-- event handlers
$('.js-search-form').submit(function (event) {
  event.preventDefault();
  state.view = ".js-search"
  var inputElement = $(event.currentTarget).find('.js-query');
  var inputValue = inputElement.val();
  getDataFromApi(inputValue, displayOpenWeatherData);
  inputElement.val("");
})

$('.js-list-items').on('click', function (event) {
  event.preventDefault();
  state.view = ".js-result-display"
  var displayImage = findImage()
  $('.weather-image').html(displayImage)
  $('.js-search').hide()
  $('.js-result-display').show()
})

$('.more-info').on('click', function (event) {
  event.preventDefault();
  $('.js-result-display').hide()
  $('.js-result-details').show()
})

$('.less-info').on('click', function (event) {
  event.preventDefault();
  $('.js-result-display').show()
  $('.js-result-details').hide()
})

$('.start-over').on('click', function (event) {
  event.preventDefault();
  state.view = ".js-starting-form"
  $('.js-starting-form').show()
  $('.js-search').hide()
  $('.js-result-display').hide()
  $('.js-result-details').hide()
})
