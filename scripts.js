//scripts.js

var url = 'https://trektravel.herokuapp.com/trips';
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
  e.preventDefault();
  console.log("I'm preventing the default");

  $('#modal-launcher').show();
  var tripUrl = $(this).attr('href')

  $.get(tripUrl, function(trip){

    $("#modal-launcher, #modal-background, #modal-close").click(function () {


      console.log(trip);
      $('#name').text(trip.name)
      $('#destination').text("Destination: " + trip.destination);
      $('#continent').text("Continent: " + trip.continent)
      $('#category').text("Category: " + trip.category);
      $('#weeks').text("Time: " + trip.weeks + " weeks");
      $('#cost').text("$" + trip.cost);
      $('#tripid').text("Trip id: " + trip.id);
      $('#about').text(trip.about);


      $("#modal-content,#modal-background").toggleClass("active");
    });


  }).always(function() {
    $('message').text("something happened.");
    console.log("something happened.");
  }).fail(function() {
    alert("this failed")
  })

});
