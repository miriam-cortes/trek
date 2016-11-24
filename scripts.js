//scripts.js
$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  $('form').submit(function(e) {
    e.preventDefault();
    //set theTripsID to be the value from the attribute in the form
    var theTripsID = $('#theTripsID').attr('value')

    var url = "https://trektravel.herokuapp.com/trips/" + theTripsID + "/reserve";
    var formData = $(this).serialize();
    // console.log("theTripsID: " + theTripsID);

    $.post(url,formData,function(response) {
      // $('#modal-content').hide()
      $('#message').html('<p> Your spot has been reserved! </p>');
      $('#message').show()
      // console.log(theTripsID);
    })
  })






  var successCallback = function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      $('#trips').append(
        '<td class="small-12 medium-6 large-4 column"><a href=' + url + "/" + response[i].id + 'id="modal-launcher">' + response[i].name + "</a></td>");
    }
  };

  //button click to get all trip options
  $('#all').click(function(event) {
    $.get(url, successCallback)
  });

  //clicking on individual trips
  $('#trips').on('click', 'a',function(e) {
    e.preventDefault(); //console.log("I'm preventing the default");
    $('#message').hide()
    $('#modal-content').show(); //the pop-up window
    var tripUrl = $(this).attr('href')

    $.get(tripUrl, function(trip){
      // this makes the modal pop up
      // console.log(trip);
      $('#name').text(trip.name)
      $('#destination').text("Destination: " + trip.destination);
      $('#continent').text("Continent: " + trip.continent)
      $('#category').text("Category: " + trip.category);
      $('#weeks').text("Time: " + trip.weeks + " weeks");
      $('#cost').text("$" + trip.cost);
      $('#tripid').text("Trip id: " + trip.id);
      $('#about').text(trip.about);
      //this sets theTripsID the same as the value in the hidden form, which is the trip.id
      $('#theTripsID').attr('value',trip.id);
      // console.log($('#theTripsID').attr('value'));

      // modal close button
      $("#modal-content").toggleClass("active");
      $("#modal-close").click(function() {
        $('#modal-content').hide()
      })

    // give me responses no matter what happens...
    }).always(function() {
      // $('message').text("something happened.");
      console.log("something happened.");
    }).fail(function() {
      alert("this failed")
    })
  });
});
