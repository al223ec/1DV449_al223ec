$(document).ready(function () {
  createMap();
  getAllItems(vm); 
  setInterval(function(){ getAllItems(vm); }, 180000);
  ko.applyBindings(vm);
});
//Meddelandets kategori (0 = Vägtrafik, 1 = Kollektivtrafik, 2 = Planerad störning, 3 = Övrigt)
function vm (){
    var that = this; 
    that.trafficInfo = ko.observableArray();
    that.selectedTrafficInfo = ko.observable();
    that.category = ko.observable(4);

    that.trafficMap = ko.observable({}); 
    that.infowindow = new google.maps.InfoWindow(); //Enda info fönstret som finns i applikationen

    that.filteredTrafficInfo = ko.computed(function(){
      var info = that.trafficInfo();
      var ret = []; 

      switch(that.category()){
        case '0' :
        case '1' : 
        case '2' : 
        case '3' :
          for(var i = 0; i < info.length; i++){
              if(info[i].category == that.category()){
                  ret.push(info[i]); 
              }
          }
          ret;
          break; 
        default : 
          for(var i = 0; i < info.length; i++){
            info[i].marker.setMap(map);
          }
          return info;  
      }
      for(var i = 0; i < info.length; i++){
        info[i].marker.setMap(null);
      }
      for(var i = 0; i < ret.length; i++){
        ret[i].marker.setMap(map);
      }
      return ret; 
    }, that);
}
var vm = new vm(); 

function sendAjaxRequest(httpMethod, callback, url, reqData) {
    $.ajax("api.php/" + (url ? "/" + url : ""), {
        type: httpMethod,
        success: callback,
        data: reqData
    });
}

function getAllItems(viewModel) {
    sendAjaxRequest("GET", function (data) {
        viewModel.trafficInfo.removeAll();
        var messages = $.parseJSON(data)["messages"]; 

        for (var i = 0; i < messages.length; i++) {
            viewModel.trafficInfo.push(createTrafficInfo(messages[i], viewModel));
        }
    }, "?action=trafficInfo");
}
function createTrafficInfo(trafficInfo, viewModel){
    var icon = getIcon(trafficInfo.priority); 
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(trafficInfo.latitude, trafficInfo.longitude),
        map: null,
        title: trafficInfo.title,
        icon: icon
    });

    google.maps.event.addListener(marker, 'click', function() {
        viewModel.selectedTrafficInfo(trafficInfo); 
        viewModel.infowindow.setContent(getContent(trafficInfo))
        viewModel.infowindow.open(map, marker);
    });

    trafficInfo['marker']  = marker; 
    return trafficInfo; 
}

function getContent(trafficInfo){
  return '<div id="content">'+
      '<h1>' + trafficInfo.title + '</h1>' +
      '<h3>' + trafficInfo.exactlocation + '</h3>' +
      '<p>' + trafficInfo.description + '</p>' +
      '<h4>' + 
      new Date(
        parseInt(trafficInfo.createddate.substring(
          trafficInfo.createddate.indexOf('(') +1, 
            trafficInfo.createddate.indexOf('+')))) 
      + '</h4>' +
    '</div>';
}

function getIcon(priority){
  //priority - Meddelandets prioritet (1 = Mycket allvarlig händelse, 2 = Stor händelse, 3 = Störning, 4 = Information, 5 = Mindre störning)
  switch(priority){
    case 1 : 
      return 'img/red-dot.png'; 
    case 2 : 
      return 'img/orange-dot.png';
    case 3 : 
      return 'img/yellow-dot.png'; 
    case 4 : 
      return 'img/blue-dot.png'; 
    case 5 : 
      return 'img/green-dot.png';
    default : 
      return 'img/purple-dot.png'; 
  } 
}
//http://maps.google.com/mapfiles/ms/icons/yellow-dot.png
var map;
function createMap(){    
  var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(62.38, 17.3), //Svall

      styles : [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
      //styles : [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}]
      //styles : [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]},{},{"featureType":"road.highway","stylers":[{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road"},{},{"featureType":"landscape","stylers":[{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]}]

    };
  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}

ko.bindingHandlers.map = {
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var trafficInfo = viewModel ? viewModel.selectedTrafficInfo() : null; 
      if(trafficInfo){
          viewModel.infowindow.setContent(getContent(trafficInfo)); 
          viewModel.infowindow.open(map, trafficInfo.marker);
      }
  }
};