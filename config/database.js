const mongoose = require('mongoose');
const { DB_URL } = require('./properties');

// arrow function to connect to BD
module.exports = () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true })
        .then(() => console.log(`Mongo connected on ${DB_URL}`)) // promesa
        .catch(err => console.log(`Connection has error ${err}`))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongo is disconnected');
            process.exit(0);
        })
    })    
}