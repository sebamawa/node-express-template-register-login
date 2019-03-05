const router = require('express').Router();
const passport = require('passport');

const UserController = require('../controllers/user.controller');

router.get('/users/login', (req, res) => {
    res.render('auth/user_login');
});
// app.post('/login', (req, res) => {
//     UserController.loginUser(req, res);
// });
router.post('/users/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
}));
router.get('/users/profile', isAuthenticated,  (req, res) => {
    res.render('auth/user_profile');
});
router.get('/users/register', (req, res) => {
    res.render('auth/user_register');
    // res.send('get a register');
});
router.post('/users/register', (req, res) => {
    //res.send('Aun no se creo el usuario');
    UserController.createUser(req, res); // MODIFICAR PARA USAR PASSPORT
});

router.get('/users/logout', (req, res, next) => {
    req.logout(); // elimina sesion
    res.redirect('/');
});

// middleware para verificar usuario logueado
// la ejecuta cualquier ruta q necesite q este autenticado
// si se quiere proteger multiples rutas deefinir un middleware antes de esas
// rutas que invoque a esta funcion middleware
function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // si usuario autenticado continua con siguiente ruta
    }
    res.redirect('/');
}

module.exports = router;