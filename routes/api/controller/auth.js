const jwt = require('jsonwebtoken');
const School = require('../models/School')


// USER SIGNUP
exports.signup = (req, res) => {
    const { schoolName, password } = req.body
    if (!schoolName || !password) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else {
        School.findOne({ schoolName }, (err, user) => {
            //check for server errors
            if(err) {
                return res.status(500).json({ success: false, error: "Something went wrong" })
            }
    
            // verify if schoolName already exist
            if(user) {
                return res.status(401).json({ success: false, error: "School already registered" })
            }
                //if every thing is fine. then create school
                const newUser = School(req.body);
                newUser.save(function (err, data) {
                    if (err) {
                        res.json({success: false, error: `Failed to save - ${err}`})
                    }
                    else {
                        res.json({ success: true, msg: 'Successfully saved', data })
                    }
                })
        })
    }
}

// LOGIN USER
exports.login = (req, res) => {
    const { adminName, password } = req.body
    School.findOne({
        adminName
    }, function (err, user) {
        // Handle server errors
            if (err) return res.status(500).send({success: false, msg: 'Something went wrong'})
            // Check if user exists
            if (!user) return res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
                    res.status(200).json({success: true, token: token, role: user.role, userId: user._id})
                }
                else {
                    return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                }
            })
    })
}


// GET USER DATA
exports.getUserData = (req, res) => {
    School.findOne({ _id: req.user.userId }).exec()
    .then(user => {
        const { _id, schoolName, adminName } = user
        res.status(200).json({
            _id,
            schoolName,
            adminName
        })
    })
}

// AUTHENTICATE USER
exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    // Verify Token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
