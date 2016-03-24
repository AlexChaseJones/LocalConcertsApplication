$('#search').submit(function(e){
  e.preventDefault();
  page = 0;
  $('#images').empty();
  gif = $('#searchBar').val().toLowerCase().trim();

  limit = $("input[name='perPage']:checked").val();
  page = 0;
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&offset=" + page + "&limit=" + limit;
    ajaxBuild();
});