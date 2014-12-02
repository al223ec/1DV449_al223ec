var http = require("http");
var url = require("url"); 
//requires the http module that ships with Node.js and makes it accessible through the variable http.
//Node.js synchronous, single-threaded, event-driven execution model

function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		//Note that our server will probably write "Request received." to STDOUT two times upon opening the page in a browser. That's because most browsers will try to load the favicon by requesting http://localhost:8888/favicon.ico whenever you open http://localhost:8888/.
		var pathName = url.parse(request.url).pathname;
		console.log("Request: " + pathName + " received.");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});

		request.addListener("end", function() {
			route(handle, pathName, response, postData);
		});
	}
 
	http.createServer(onRequest).listen(8888);
	console.log("Server started");
}

exports.start = start;