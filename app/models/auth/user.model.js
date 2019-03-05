/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true // quita espacios en blanco
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // no se pueden registrar 2 emails iguales
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true // guarda en la coleccion la fecha de creacion y actualizacion
});

module.exports = userSchema;