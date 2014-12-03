$(document).ready(function () {
  createMap();
  getAllItems(vm);
  ko.applyBindings(vm);
});
//Meddelandets kategori (0 = Vägtrafik, 1 = Kollektivtrafik, 2 = Planerad störning, 3 = Övrigt)

function vm (){
    var that = this; 
    that.trafficInfo = ko.observableArray();
    that.selectedTrafficInfo = ko.observable();
    that.category = ko.observable(4);

    that.trafficMap = ko.observable({}); 

    that.filteredTrafficInfo = ko.computed(function(){
      var info = that.trafficInfo();
      switch(that.category()){
        case '0' :
        case '1' : 
        case '2' : 
        case '3' :
          var ret = []; 
          for(var i = 0; i < info.length; i++){
              if(info[i].category == that.category()){
                  ret.push(info[i]); 
              }
          }
          return ret;
        default : 
          return info; 
      }
    }, that);
}
var map;
var vm = new vm(); 

function sendAjaxRequest(httpMethod, callback, url, reqData) {
    $.ajax("api.php/" + (url ? "/" + url : ""), {
        type: httpMethod,
        success: callback,
        data: reqData
    });
}

/*function handleEditorClick() {
    sendAjaxRequest("POST", function (newItem) {
        model.reservations.push(newItem);
    }, null, {
        ClientName: model.editor.name,
        Location: model.editor.location
    });
}*/
function getAllItems(model) {
    sendAjaxRequest("GET", function (data) {
        model.trafficInfo.removeAll();
        var messages = $.parseJSON(data)["messages"]; 

        for (var i = 0; i < messages.length; i++) {

            messages[i]['marker']  = new google.maps.Marker({
                position: new google.maps.LatLng(messages[i].latitude, messages[i].longitude),
                map: null,
                title: messages[i].title,
            });
            model.trafficInfo.push(messages[i]);
        }
    });
}

function createMap(){    
  var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(62.38, 17.3), //Svall
      mapTypeId: 'terrain'
  };
  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}
var update = 0; 

ko.bindingHandlers.map = {
   init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
   /*     
    http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs
    console.log(viewModel);
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        
        var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(mapObj.lat),
            ko.utils.unwrapObservable(mapObj.lng));
        var mapOptions = { center: latLng,
                          zoom: 5, 
                          mapTypeId: google.maps.MapTypeId.ROxADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);*/
  },
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      console.log(update += 1);
       
      if(viewModel.selectedTrafficInfo()){

          var latlng = new google.maps.LatLng(viewModel.selectedTrafficInfo().latitude, 
            viewModel.selectedTrafficInfo().longitude);
          map.setCenter(latlng);
      }
      var info = viewModel.filteredTrafficInfo(); 

      if(info){
        for(var i = 0; i < viewModel.trafficInfo().length; i++){
        viewModel.trafficInfo()[i].marker.setMap(null);
        }
        for(var i = 0; i < info.length; i++){
          info[i].marker.setMap(map);
        }
      }
      //var latlng = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());
      //viewModel._mapMarker.setPosition(latlng);
      //map.setCenter(latlng);
  }
};

