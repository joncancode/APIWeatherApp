

var OPENWEATHER_SEARCH_URL = 'api.openweathermap.org/data/2.5/forecast';
console.log(OPENWEATHER_SEARCH_URL);

function getDataFromApi(searchTerm, callback) {
  var query = {
    id: searchTerm,
    APPID: "b518aac4e68754c3d5ef20b99bcc6111",
  }
  $.getJSON(OPENWEATHER_SEARCH_URL, query, function(response){
    console.log(response.items[0]); 
  });
}


//getDataFromApi();
