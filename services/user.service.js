const User = require('../models/user.model');

require('../mongo').connect();

function getUsers(req, res) {
    const docquery = User.find({});
    docquery.exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

function postUsers(req, res) {
    const originalUser = { name: req.body.name, age: req.body.age,
        sex: req.body.sex, username: req.body.username,password: req.body.password};
    const user = new User(originalUser);
    user.save(error => {
        if (checkServerError(res, error)) return;
        res.status(201).json(user);
        console.log('user created successfully!');
    });
}

function putUsers(req, res) {
    const id = parseInt(req.params.id, 10);
    const updateUser = { id: req.body.id, name: req.body.name };
    User.findOne({ id: id }, (error, user) => {
        if (checkServerError(res, error)) return;
        if (!checkFound(res, user)) return;
        user.name = updateUser.name;

        user.save(error => {
            if (checkServerError(res, error)) return;
            res.status(200).json(user);
            console.log('user updated successfully!');
        });
    });
}

function deleteUsers(req, res) {
    const id = parseInt(req.params.id, 10);
    User.findOneAndRemove({ id: id })
        .then(user => {
            if (!checkFound(res, user)) return;
            res.status(200).json(user);
            console.log('User deleted');
        })
        .catch(error => { if (checkServerError(res, error)) return; });
}

function checkFound(res, user) {
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    return user;
}

function checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
}

module.exports = { getUsers, postUsers, putUsers, deleteUsers };