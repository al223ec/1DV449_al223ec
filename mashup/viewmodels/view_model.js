var srUrl = ;  

  var model = {
      trafficInfo: ko.observableArray(),
      selectedTrafficInfo : ko.observable(),
      category: ko.observable(),
      availableCountries: ko.observableArray(
      ['France', 'Germany', 'Spain','France', 'Germany', 'Spain',])
  }

  function sendAjaxRequest(httpMethod, callback, url, reqData) {
      $.ajax("web/" + (url ? "/" + url : ""), {
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

          for (var i = 0; i < data.length; i++) {
              model.trafficInfo.push(data[i]);
          }
      });
  }
