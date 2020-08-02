const express = require('express');
const User = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
import bcrypt from 'bcryptjs';


/* LOGIN a user. */
router.post('', [
        check('email', 'Email field is required').notEmpty().trim().isEmail().withMessage('Invalid email'),
        check('password', 'Your password must be at least 5 characters').not().isEmpty(),
    ],
    async function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }

        try {

            const user = await User.findOne({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            }).exec();

            if (user) {

                const token = jwt.sign({email, id: _id}, "QWERTYUIOP", {expiresIn: 18000000});


            } else {
                // User does not exist.
                res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

        } catch (e) {
            res.status(500).json({
                error: e
            });
        }
    })


module.exports = router;
