var mongoose 	= require('mongoose');
var Schema      = mongoose.Schema;

var trendQuerySchema = new Schema({
	trends : [{
			name : 	String,
			query : String,
			url : 	String,
	}],
	as_of : { type: Date, default: Date.now },
    created_at : { type: Date, default: Date.now },
	locations : {
		name : String,
        woeid : String,
	},
});

//Exempel funktion
trendQuerySchema.methods.compareDate = function (dateToCompare) {
	//compare dates, för att spara om detta är en ny query

}
module.exports = mongoose.model('TrendQuery', trendQuerySchema);