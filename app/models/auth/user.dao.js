const mongoose = require('mongoose');
const UserSchema = require('./user.model');

// agrega metodos a esquema
UserSchema.statics = {

    create: function(userData, cb) {
        const user = new this(userData); 
        user.save(cb);
    },

    login: function(query, cb) {
        this.find(query, cb);
    }
}

const UserModel = mongoose.model('User', UserSchema); // crea tabla Users
//* debug
console.log('Se creo tabla Users');
module.exports = UserModel;