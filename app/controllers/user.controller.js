const UserModel = require('../models/auth/user.dao');

//exports.createUser = (req, res, next) => { // funcion flecha (anonima) si se fuera a usar desde url como api rest 
                                            //(se ejecuta automaticamente: router.post('/register', Users.createUser);)
exports.createUser = function (req, res) {    
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }   

    UserModel.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email already exists');
        if (err) return res.status(500).send('Server error');

        //* debug
        console.log('Usuario creado');

        res.render('auth/user_login');
    })
}

exports.loginUser = function(req, res) {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    UserModel.findOne({email: userData.email}, (err, user) => {
        if (err) return res.status(500).send('Server error!');

        if (!user) {
            // email does not exist
            res.status(409).send('Something is wrong');
        } else { 
            // user find. Check password
            if (user. password == userData.password) {
                res.render('auth/user_profile');
            } else {
                // password wrong
                res.status(409).send('Something is wrong');
            }
        }
    });
}

