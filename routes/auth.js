const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator/check');
const User = require('../models/user');
const bcrypt = require("bcryptjs")
const validObjectId = require('../middleware/validObjectId');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// sign-up route
router.post('/signup', [
    body('name').isLength({min:4})
        .withMessage("name should be at least 4 characters."),
    body('email').isEmail().normalizeEmail()
        .withMessage("E-mail must be valid.")
        .custom( (value, {req}) => {
            return User.findOne({email: value})  // check if email exist
            .then( user => {
                if (user) {
                    return Promise.reject("E-mail Already Exist.");
                }
            });
    }),
    body('password').trim()
        .isLength({min:6}).withMessage("Password must be at least 6 length"),
    
    body('confirmPassword').trim()
        .custom( (value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            }
            return true;
        })

] ,authController.signup);


// login route
router.post('/login', [
    body('email').isEmail().normalizeEmail()
        .withMessage("E-mail Not Valid!")
        .custom( (value, {req}) => {
            return User.findOne({email: value})
            .then( user => {
                if (!user) {
                    return Promise.reject("E-mail or Password not correct!");
                }
            })
        }),
    body('password').trim()
        .custom( async (value, {req}) => {
            const user = await User.findOne({email: req.body.email});
            const isEqual = await bcrypt.compare(value, user.password);
            if (!isEqual) {
                throw new Error("E-mail or Password not correct!");
            }
            return true;
        })
] , authController.login);


//get user by id
router.get('/user/:id', [validObjectId, isAuth] , authController.getUser);

// check email existance for frontend validation
router.get('/checkemail/:email', authController.checkEmail);


module.exports = router;