var exec = require("child_process").exec; 

function start(response) {
	console.log("Request handler 'start' was called.");
	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		//on success error will be null
		if(error === null){
			response.write(stdout);
		} else{
			response.write(error + " " + stderr);
		}
		response.end();
	});

}
function upload(response) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

exports.start = start;
exports.upload = upload;
