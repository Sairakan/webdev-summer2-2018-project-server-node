module.exports = (app) => {

    var userModel = require('../models/user/user.model.server');

    const register = (req, res) => {
       var user = req.body;
        userModel.findUserByEmail(user.email)
            .then(user2 => {
                if (!user2) {
                    return userModel
                        .createUser(user)
                }
                else{
                    res.send(null);
        }
            })
            .then(user1 => {
                req.session['currentUser'] = user1;
                res.send(user1);
            });
    }

    const login = (req, res) => {
        var email = req.body.email;
        var isSocialLogin = req.body.isSocialLogin;

        if (isSocialLogin) {
            userModel.findUserByEmail(email)
                .then(user => {
                    if(user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    } else {
                        res.send(null);
                    }
            })
        } else {
            var password = req.body.password
            userModel.findUserByEmailAndPassword(email, password)
                .then(user => {
                    if(user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    } else {
                        res.send(null);
                    }
            })
        }
    }
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
    const updateUser = (req, res) => {
        userModel.updateUser(req.body._id, req.body)
            .then(response => {
                if (response) {
                    req.session['currentUser'] = req.body;
                    res.send(req.body);
                }
            })
    }
    const profile = (req, res) => {
        res.json(req.session['currentUser']);
    }
    const userProfile = (req, res) => {
        userModel.findUserById(req.params.userId)
            .then(user => res.send(user));
    }
    const findAllUsers = (req, res) => {
        userModel.findAllUsers()
            .then(users => res.send(users));
    }
    const findUserById = (req, res) => {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }
    const findUserByUsername = (req, res) => {
        userModel.findUserByUsername(req.params['username'])
            .then(user => {
                res.send(user);
            });
    }
    const deleteUser = (req, res) => {
        userModel.deleteUser(req.params['userId'])
            .then(() => res.sendStatus(200));
    }

    function updateShoppingCart(req, res) {
        let user = req.session['currentUser'];
        userModel.updateShoppingCart(user._id, req.body)
            .then(() => {
                userModel.findUserById(user._id)
                    .then(user => {
                        req.session['currentUser'] = user;
                        res.send(user);
                    })
            });
    }

    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateUser);
    app.get('/api/profile', profile);
    app.get('/api/profile/:userId', userProfile);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/register/:username', findUserByUsername);
    app.delete('/api/profile/:userId', deleteUser);
    app.put('/api/cart', updateShoppingCart);
}