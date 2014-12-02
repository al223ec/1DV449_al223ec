<?php

include_once './src/router.php';
include_once './src/controller/web_controller.php';


$router = new Router(); 
$router->route(); 

?>

<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="css/style.css" />

  </head>
  <body>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2 text-center">
          <h1>Mashup <span> Laboration 03</span></h1>
          <p> Anton Ledström - al223ec </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <p>I denna laboration det meningen att du ska skriva en Mashup-applikation som kombinerar två stycken olika tjänster. Tjänsterna du ska jobba med är:</p>

          <ul>
          <li><a href="http://sverigesradio.se/api/documentation/v2/index.html">Sveriges radios öppna API</a> </li>
          <li><a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google Map</a>. </li>
          </ul>

          <p>Tanken är att du ska bygga en javascript-applikation som ska visa trafikinformation som Sveriges Radio ger dig och presentera dessa via en karta från Google.</p>

        </div>
      </div>
    </div>
  </section>
  <section class="map">
    <div class="row">
      <div class="col-md-8" id="map-canvas"></div>
      <div class="col-md-4">
          <p>Välj kategori : 
              <div>
                <input type="radio" name="categoryGroup" value="0" data-bind="checked: category" /> 
                Vägtrafik
                <input type="radio" name="categoryGroup" value="1" data-bind="checked: category" /> 
                Kollektivtrafik
                <input type="radio" name="categoryGroup" value="2" data-bind="checked: category" /> 
                Planerad störning 
                <input type="radio" name="categoryGroup" value="3" data-bind="checked: category" /> 
                Övrigt
                <input type="radio" name="categoryGroup" value="4" data-bind="checked: category" /> 
                Alla kategorier
              </div>
          </div>

          <select data-bind="options: availableCountries" size="35" multiple="true"></select>
       </div>
    </div>
  </section>
    <script type="text/javascript" 
      src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/knockout-3.2.0.js"></script>
    <script type="text/javascript" src="viewmodels/view_model.js"></script>
    <script type="text/javascript" 
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2BwG_H_rJ5JlGyLZ4hct2jZUMt72pQs0"></script>   

    <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

      $(document).ready(function () {
          //getAllItems();
          callOtherDomain(); 
          ko.applyBindings(model);
      })
    </script>
  </body>
</html>