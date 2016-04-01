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
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropd own.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}