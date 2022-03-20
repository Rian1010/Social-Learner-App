const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const Profile = require('../../models/Profile');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult
} = require('express-validator/check');
const Post = require('../../models/Post');

// @route   api/auth
// @desc    Get user by token
// @access  Public

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", [
    check('email', 'Please insert a valid email address').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({
        errors: errors.array()
    });

    const {
        email,
        password,
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        let profile = await Profile.findOne({
            user: user.id
        });

        let post = await Post.findOne({
            user: user.id
        });

        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            });
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                date: user.date,
            },
            profile: {
                _id: profile._id,
                user: profile.user,
                company: profile.company,
                skills: profile.skills,
                status: profile.status,
                experience: profile.experience,
                education: profile.education,
                date: profile.date,
            },
            post: {
                user: post.user,
                name: post.name,
                text: post.text,
                avatar: post.avatar,
                likes: post.likes,
                comments: post.comments,
                date: post.date,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });


        });
        // res.send('User registered');
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error');
    }

});

module.exports = router;