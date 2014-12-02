var map;

var model = {
    trafficInfo: ko.observableArray(),
    
    selectedTrafficInfo : ko.observable(),
    category: ko.observable(),

    lat : ko.observable(12.24),
    lng : ko.observable(24.54)
}

function sendAjaxRequest(httpMethod, callback, url, reqData) {
    $.ajax("api.php/" + (url ? "/" + url : ""), {
        type: httpMethod,
        success: callback,
        data: reqData
    });
}
function handleEditorClick() {
    sendAjaxRequest("POST", function (newItem) {
        model.reservations.push(newItem);
    }, null, {
        ClientName: model.editor.name,
        Location: model.editor.location
    });
}
function getAllItems() {
    sendAjaxRequest("GET", function (data) {
        model.trafficInfo.removeAll();
        var messages = $.parseJSON(data)["messages"]; 

        for (var i = 0; i < messages.length; i++) {
            model.trafficInfo.push(messages[i]);
            messages[i].lat = ko.observable(messages[i].latitude); 
            messages[i].lng = ko.observable(messages[i].longitude);

            messages[i].marker  = new google.maps.Marker({
                position: new google.maps.LatLng(messages[i].latitude, messages[i].longitude),
                map: map,
                title: messages[i].title,
            });
        }
    });
}

function createMap(){    
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(12.24, 24.54),
        mapTypeId: 'terrain'
    };
  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}

ko.bindingHandlers.map = {
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      if(viewModel.selectedTrafficInfo()){
          var latlng = new google.maps.LatLng(viewModel.selectedTrafficInfo().latitude, 
            viewModel.selectedTrafficInfo().longitude);
          map.setCenter(latlng);
      } 
      //var latlng = new google.maps.LatLng(allBindingsAccessor().latitude(), allBindingsAccessor().longitude());
      //viewModel._mapMarker.setPosition(latlng);
      //map.setCenter(latlng);
  }
};

/*
  function trafficInfo(json) {

      this.latitude = ko.observable(json['latitude']);
      this.longitude = ko.observable(json['longitude']);

  }*/
