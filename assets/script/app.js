$('#search').submit(function(e){
  e.preventDefault();


    queryURL = "http://api.bandsintown.com/events/recommended.json?artists[]=Common&artists[]=Dwele&location=Chicago,IL&app_id=bob";
    ajaxBuild();
});

function ajaxBuild(){
  $.ajax({
      url: queryURL,
      method: 'GET'})
      .done(function(response) {
      response.addHeader("Access-Control-Allow-Origin", "*");
      console.log(response)
    });
}
//http://api.bandsintown.com/events/search.json?location=Boston,MA&page=1&app_id=YOUR_APP_ID
//Returns all events (page 1) in Boston, MA. no callback.

//http://api.bandsintown.com/artists/Skrillex/events.json?app_id=YOUR_APP_ID
//Returns all events for Skrillex.

//http://api.bandsintown.com/events/search.json?location=Boston,MA&page=2&per_page=3&app_id=YOUR_APP_ID
//Returns all events in Boston (page 2), with 3 results. no callback.

//http://api.bandsintown.com/events/recommended.json?artists[]=Common&artists[]=Dwele&location=Chicago,IL&app_id=YOUR_APP_ID&callback=bitEvents
//Returns recommended upcoming shows for Common or Dwele fans within 25 miles of Chicago, IL.