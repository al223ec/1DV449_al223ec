var mongoose = require('mongoose');

module.exports = mongoose.model('Trend', {
	name : 	{ type : String, default: ''},
	query : { type : String, default: ''},
	url : 	{ type : String, default: ''}
}); 
