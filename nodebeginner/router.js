function route(handle, pathname, response) {

  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function'){
  		handle[pathname](response); 
  }else{
  	console.log("no request handle found " + pathname); 
  	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("404 not found " + pathname);
  	response.end();
  }
}

exports.route = route;