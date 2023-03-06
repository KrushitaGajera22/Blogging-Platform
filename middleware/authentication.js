const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('authorization').split(' ')[1];
        const decoded = jwt.verify(token, "" + process.env.JWT_KEY);
        req.data = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if(req.data.isAdmin){
            next()
        }
        else{
            res.status(403).send('Not Authorized');
        }
    })
};

module.exports = {auth, isAdmin};