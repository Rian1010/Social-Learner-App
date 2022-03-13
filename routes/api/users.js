const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const {
    check,
    validationResult
} = require('express-validator/check');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please insert a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({
        errors: errors.array()
    });

    const {
        name,
        email,
        password,
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })

        user = new User({
            name,
            email,
            avatar,
            password,
        });

        // Salt to do the hashing
        const salt = await bcrypt.genSalt(10);

        // Encrypt password
        user.password = await bcrypt.hash(password, salt)

        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            })
        });

        // res.send('User registered');
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error');
    }

});

module.exports = router;