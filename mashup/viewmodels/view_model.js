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
      return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; 
    case 2 : 
      return 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
    case 3 : 
      return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'; 
    case 4 : 
      return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'; 
    case 5 : 
      return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    default : 
      return 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'; 
  } 
}
var map;
function createMap(){    
  var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(62.38, 17.3), //Svall
      mapTypeId: 'terrain'
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