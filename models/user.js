const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required:true,
        minlength:6
    },
    todoLists: [
        {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true
                }
            })
        }
    ]
});

// generate JWT expires in 2 hours
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
        userId: this._id,
        email: this.email
    }, process.env.JWT_KEY || 'mysecretkey', {expiresIn: '2h'});
}
module.exports = mongoose.model('User' , userSchema);