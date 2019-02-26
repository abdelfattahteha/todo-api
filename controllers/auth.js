const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

// signup users
exports.signup = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
            .json({message: "Validation Errors!", data: errors.array()});
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword    
        });

        const newUser = await user.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({
            message: 'User created successfully',
            user: newUser, 
            token: token
        });

    } catch (err) {
        next(err);
    }
}

//  login users
exports.login = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
            .json({message: "Validation Errors!", data: errors.array()});
    }
    try {
        const user = await User.findOne({email: req.body.email});
        const token = user.generateAuthToken();  // Generate JWT
        res.status(200).json({token: token, user:user});
    } catch (err) { 
        next(err) 
    };
}

// get user by id
exports.getUser = async (req,res,next) => {

    // check if user can access other user todo-list
    if (req.params.id != req.userId) {
        const error = new Error("Not Authorized to see other user's List");
        error.statusCode = 403;
        return next(error);
    }

    try {
        const user = await User.findById(req.params.id).select('-password -__v');
        if(!user) {
            const error = new Error(`No User with ID=${req.params.id}`);
            error.statusCode= 404;
            throw error;
        }
        res.status(200).json({user:user});
    } catch(err) {
        next(err);
    }
}

// check email for frontend validation
exports.checkEmail = async (req,res,next) => {
    let user = await User.findOne({email: req.params.email});
    let emailExist = false;
    if (user) {
        emailExist = true;
    }
    res.status(200).json({emailExist: emailExist});
}
