const express = require('express');
const User = require("mongoose");
const router = express.Router();
import bcrypt from 'bcryptjs';


/* CREATE a new user. */
router.post('', [
        check('email', 'Your email is not valid').not().isEmpty(),
        check('password', 'Your password must be at least 5 characters').not().isEmpty(),
    ],
    async function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }

        const email = req.body.email;
        const password = req.body.password;

        try {
            let user = new User({
                email: email,
                password: bcrypt.hashSync(password, 8),
                key: generatedKey(),
                secret: generatedSecret()
            });

            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User created successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        } catch (e) {
            res.status(500).json({
                error: e
            });
        }
    })

const alpha = "ABCDEFGHIJKLMNOPQRSTUPWXYZ0123456789".split('');

async function generatedKey() {
    let key = 'key_';
    for (let i = 0; i < 10; i++) {
        key += alpha[Math.floor(Math.random() * Math.floor(alpha.length - 1))];
    }
    try {
        let exists = await User.findOne({key: key});
        if (exists) {
            generatedKey();
        } else {
            return key;
        }
    } catch (error) {
        // TODO: Handle error properly, don't just return key.
        return key;
    }
}

async function generatedSecret() {
    let secret = 'secret_';
    for (let i = 0; i < 10; i++) {
        secret += alpha[Math.floor(Math.random() * Math.floor(alpha.length - 1))];
    }
    try {
        let exists = await User.findOne({secret: secret});
        if (exists) {
            generatedSecret();
        } else {
            return secret;
        }
    } catch (error) {
        // TODO: Handle error properly, don't just return key.
        return secret;
    }
}

module.exports = router;
