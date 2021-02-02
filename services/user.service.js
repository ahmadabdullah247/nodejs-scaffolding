const express  = require('express');
const config  = require('config');
const bcrypt  = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');

const router = express.Router();


// @router POST api/user
// @dec    Register user
// @access Public
router.post('/', [ 
    check('name', 'Please name is required').not().isEmpty(),
    check('email', 'Please include validemail').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })],
    async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(409).json({ msg: 'User already exsist' })
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, 
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
});

module.exports = router;