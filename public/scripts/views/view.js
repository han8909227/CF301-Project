'use strict';


const view = {}
const preList = function(){
  let $list = $('#listResult');

  $list.empty();
};

const render = Handlebars.compile($('#list-template').text());

view.index = function(){
  preList();
  $('#listResult').append(
    Events.all.map(render)
  );
}


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: parseFloat(Events.all[0].location.latitude), lng: parseFloat(Events.all[0].location.longitude)}
  });
  initMarkers(map);
}

function initMarkers(map) {

  Events.all.forEach(function(json, index) {
    if(json.location) {
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(json.location.latitude), lng: parseFloat(json.location.longitude)},
        visible: false,
        map: map,
        animation: google.maps.Animation.DROP
      });


      var infoWindow = new google.maps.InfoWindow({
        content: `<h1>Event: ${json.name}</h1> <p>Date: ${json.date.localDate}</p> <p> Venue: ${json.venues}</p> <p>Category: ${json.genre.segment.name} </p> <p>Price: ${json.price ? '$'+parseInt(json.price[0].min) + ' - ' + '$' + parseInt(json.price[0].max) : 'N/A'}`
      })

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      })

      $('#listResult').on('click',`ul:nth-of-type(${index+1})`, function() {
        if(!marker.visible){
          marker.setVisible(true);
          $(this).css('background-color', '#59A5D8');
        } else {
          marker.setVisible(false);
          $(this).css('background-color', '#BCE7FD');
          marker.setAnimation(google.maps.Animation.DROP)
        }
      })
    }
  });
}

function openSlideMenu(){
  document.getElementById('side-menu').style.width = '250px';
}

function closeSlideMenu(){
  document.getElementById('side-menu').style.width = '0';
}


$('#listResult').on('mouseenter', 'ul', function() {
  $(this).animate({borderWidth: 5},200);
})
$('#listResult').on('mouseleave', 'ul', function() {
  $(this).animate({borderWidth: 3},200);
})


function initShowSearch() {
  $('main').fadeIn();
  $('#mapContainer, #listResult, #btn-back').hide();
}

function initShowResults() {
  $('main').hide();
  $('#mapContainer, #listResult, #btn-back').fadeIn();
}

$('#btn-back').on('click',initShowSearch);
$('#input-form').on('submit',initShowResults);
initShowSearch();
