var mongoose = require('mongoose');

module.exports = mongoose.model('Trends', {
	trends : null, 
	as_of : Date,
    created_at : ,
	locations : null,
}); 