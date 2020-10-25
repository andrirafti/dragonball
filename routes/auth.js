const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

/* const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); */
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const authController = require('../controllers/authController');

router.post(
    "/",
    [
        validate([
            body("user")
                .not()
                .isEmpty()
                .trim()
                .escape()
                .exists(),
            body("password")
                .not()
                .isEmpty()
                .trim()
                .escape()
                .exists()
        ])
    ],
    (req, res) => {
        const username = req.body.user;
        const { password } = req.body;

        try {
            const response = authController.authUser(username, password)
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({
                message: error
            });
        }

        /* User.findOne(
            {
                username: { $regex: new RegExp(`^${username}`, "i") }
            },
            (err, user) => {
                if (err) throw err;

                if (user) {
                    const hash = user.password;

                    bcrypt.compare(password, hash, (err, exists) => {
                        if (err) throw err;
                        if (exists) {
                            const payload = {
                                user: username
                            };

                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn: "1h" },
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(200).json({
                                        message: "Authenticated",
                                        token
                                    });
                                }
                            );
                        }
                    });
                } else {
                    res.status(401).json({
                        message: "The user wasn't found."
                    });
                }
            }
        ); */
    }
);

module.exports = router;
