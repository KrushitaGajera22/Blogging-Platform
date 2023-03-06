const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = require('../models/login');

// for creating new user
exports.signup = (req, res, next) => {
    Login.find({ email: req.body.email })
        .exec()
        .then(login => {
            if (login.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            errror: err
                        });
                    } else {
                        const login = new Login({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        login
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Signed Up!!',
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    };
                });
            }
        })
}

//for login
exports.login = (req, res, next) => {
    Login.find({ email: req.body.email })
        .exec()
        .then(login => {
            if (login.length < 1) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
            bcrypt.compare(req.body.password, login[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authentication Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: login[0].email,
                        loginId: login[0]._id,
                        isAdmin: login[0].isAdmin,
                    },
                       "" + process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Authentication Success',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}

//for logout
exports.login_delete = (req, res, next) => {
    Login.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}