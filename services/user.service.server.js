module.exports = (app) => {

    var userModel = require('../models/user/user.model.server');

    const register = (req, res) => {
        let newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then(user => {
                if (!user) {
                    return userModel
                        .createUser(newUser)
                }
            })
            .then(user => {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }
    const login = (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        userModel.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                } else {
                    res.sendStatus(0);
                }
            });
    }
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
    const updateUser = (req, res) => {
        userModel.updateUser(req.body._id, {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
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
}