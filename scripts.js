//scripts.js

var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log(response);
  for (var i = 0; i < response.length; i++) {
    $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
  }
};

$('#load').click(function(event) {
  $.get(url, successCallback)
});

$('#trips').on('click', 'a',function(e) {
  e.preventDefault();
  console.log("I'm preventing the default");


})
