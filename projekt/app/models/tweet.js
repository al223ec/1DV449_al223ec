var mongoose = require('mongoose');
module.exports = mongoose.model('Tweet', {
	
    name : {type : String, default: ''}
});