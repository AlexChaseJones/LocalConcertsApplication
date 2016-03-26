var locationArray = [];

$('#upcoming-container').hide();

$('#search').submit(function(e){
	$('#upcoming-container').hide('slow');
	$('#errorMSG').remove();
	e.preventDefault();
	locationArray = [];
	var artist = $('#artist').val().trim();
	var city = $('#city').val().trim();
	var state = $('#state').val();
	var radius = $('#radius').val();

	if (radius < 10) {
		radius = 10;
		} else if (radius > 150) {
			radius = 150;
		} else if (!radius) {
			radius = 50;
		}

	if (!city && !state) {
		solo = true;
	} else {
		solo = false;
	}

	if (city && state) {
		city = city + ",";
	}
	$('#tabOneInner').empty();

	if (artist == "" && city == "" && state == "") {
		$('#submitButton').after('<p id="errorMSG">Please enter at least one field</p>')
	} else {
		$('#upcoming-container').show('slow','swing', function(){
			$('html, body').animate({
		        scrollTop: $("#upcoming").offset().top
		    }, 500);
		});
		generateURL(solo, artist, city, state, radius);
		ajaxBuild();
		
	}
});

function ajaxBuild(){
	$.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp'
	}).done(function(response) {
		console.log(response)
	    var limit = 0;
	    for (var i = 0; i < response.length; i++) {
			if (limit < 12) {
	        	limit++;
	        	createShowCard(response[i].artists[0].name,response[i].datetime, response[i].venue.name, response[i].venue.city, response[i].venue.region, response[i].ticket_status, response[i].ticket_url);
	      		buildMapObjects(response[i].artists[0].name, response[i].venue.name, response[i].venue.latitude, response[i].venue.longitude)
	      	} else {
	        	i = response.length;
	    	}
	    };

	    //davidsFunction(locationArray)
	});
}

function generateURL(solo, artist, city, state, radius){
    if (solo) {
        introURL = "";
        endURL = "/events.json?"
    } else if (!solo) {
        introURL = "events/search?"
        endURL = "";
    };

    if (city && state) {
      city = city + ", "
    }

    if (!city && !state && artist) {
        artistQuery = "artists/" + artist + "/events.json?";
        locationQuery = "";
    } else if (!artist && (city || state)) {
        artistQuery = "";
        locationQuery = "&location=" + city + state;
    } else if (artist && (city || state)) {
        artistQuery = "artists[]=" + artist;
        locationQuery = "&location=" + city + state;
    } else {
    }


    queryURL = "http://api.bandsintown.com/" + introURL + artistQuery + endURL + locationQuery + "&page=1&per_page=10&radius=" + radius + "&format=json&app_id=Concertch"
}

function createShowCard(name, date, venue, city, state, tickets, ticketsURL){
	date = moment(date).format('MMMM Do YYYY');
	console.log(ticketsURL)
	debugger;
	if (tickets == "available") {
		ticketStatus = $('<a target="_blank">');
		ticketStatus.attr('href', ticketsURL);
		ticketStatus.addClass('buyTicket');
		ticketStatus.text('Tickets Available!')
	} else {
		ticketStatus = "Sold Out :("
	}
	console.log(tickets)
	var nameInfo = $('<div class="cardName">').append('<p>' + name + '</p>');
	var dateInfo = $('<div class="cardDate">').append('<p>' + date + ' - ' + city + ' ' + state + '</p>');
	var venueInfo = $('<div class="cardVenue">').append('<p><u>Venue</u><br>' + venue + '</p>');
	var locationInfo = $('<div class="cardLocation">').append('');
	var ticketInfo = $('<div class="cardTicket">').append(ticketStatus);
	var newCard = $('<div class="showCard">');
	(newCard).append(nameInfo).append(dateInfo).append(venueInfo).append(locationInfo).append(ticketInfo);
	
	if (tickets == "available") {
		newCard.addClass('available');
	} else {
		newCard.addClass('unavailable');
	}

	$('#tabOneInner').append(newCard);

}

function buildMapObjects(name, venue, latitude, longitude){
	var venueObject = {
		artist: name,
		venue: venue,
		latitude: latitude,
		longitude: longitude
	}

	locationArray.push(venueObject)

}
$(function() {
    $("#tabs").tabs();
  });
//http://api.bandsintown.com/events/search.json?location=Boston,MA&page=1&app_id=YOUR_APP_ID
//Returns all events (page 1) in Boston, MA. no callback.

//http://api.bandsintown.com/artists/Skrillex/events.json?app_id=YOUR_APP_ID
//Returns all events for Skrillex.

//http://api.bandsintown.com/events/search.json?location=Boston,MA&page=2&per_page=3&app_id=YOUR_APP_ID
//Returns all events in Boston (page 2), with 3 results. no callback.

//http://api.bandsintown.com/events/recommended.json?artists[]=Common&artists[]=Dwele&location=Chicago,IL&app_id=YOUR_APP_ID&callback=bitEvents
//Returns recommended upcoming shows for Common or Dwele fans within 25 miles of Chicago, IL.






