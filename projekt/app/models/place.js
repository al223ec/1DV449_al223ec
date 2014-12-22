var mongoose = require('mongoose');

module.exports = mongoose.model('Place', {
	name : { type : String, default: '' },
	placeType : {
		code : { type : int, default: 0 },
		name : { type : String, default: '' }
	},
	url : { type : String, default: '' },
	parentid : { type : int, default: 0 },
	country : { type : String, default: '' },
    woeid : { type : int, default: 0 }
});