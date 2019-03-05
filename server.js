const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');

const DB = require('./config/database');
const { PORT } = require('./config/properties');
//const UserController = require('./app/controllers/user.controller');

// INITIALIZATIONS
const app = express();
DB(); // connect to database
require('./app/models/passport/local-auth');


// SETTINGS

// views folder 
app.set('views', __dirname + '/app/views');
// view engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // va luego del seteo anterior

// MIDDLEWARES

app.use(express.urlencoded({extended: false})); // indica que datos se reciben desde formulario (NO imagenes) -> NECESARIO
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // app.locals.loginMessage variable global a la app (recuperada de local-auth)
    app.locals.loginMessage = req.flash('loginMessage');
    // app.locals.registerMessage = req // TODO
    app.locals.user = req.user; // guardo usuario logueado que retorna  session de passport
                    // se usa para clasificar pestañas a mostrar en el template
    next();
});

// hbs.registerHelper('loginMessage', () => {
//     return app.locals.loginMessage;
// });
// hbs.registerHelper('userAuthenticated', () => {
//     return app.locals.user;
// });

// ROUTES TO WEBPAGES

app.get('/', (req, res) => {
    res.render('home');
});
// rutas para autenticacion y perfil de usuario
 app.use(require('./app/routes/user.routes'));

// ROUTES TO APIS

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});