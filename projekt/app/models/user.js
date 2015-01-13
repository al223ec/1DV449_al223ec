var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    trendQueries :  [{
        as_of : { type: Date, default: Date.now },
        created_at : { type: Date, default: Date.now },
        locations : {
            name : { type: String, trim: true },
            woeid :{ type: String, trim: true },
            lat : { type: Number, min: 0 },
            lng : { type: Number, min: 0 },
        },
        trends : [{
            name :  { type: String, trim: true },
            query : { type: String, trim: true },
            url :   { type: String, trim: true },
        }],
    }],
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);