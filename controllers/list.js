const User = require('../models/user');


exports.addToList = async (req,res,next) => {
    try {
        let user = await User.findById(req.userId);
        user.todoLists.push({title: req.body.title});
        user = await user.save();
        res.status(201).json({message: "New List Added", user: user});
    } catch(err) {
        next(err);
    }
    
}

// remove from list
exports.removeFromList = async (req,res,next) => {
    try {
        let user = await User.findById(req.userId);
        const list =  user.todoLists.id(req.params.id);
        if (!list) {
            const error = new Error(`No List with ID=${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }
        list.remove();
        user = await user.save();
        res.status(200).json({message: "list deleted successfully", user: user});
    } catch(err) {
        next(err);
    }
    
}

// update list
exports.editList = async (req,res,next) => {
    try {
        let user = await User.findById(req.userId);
        const list =  user.todoLists.id(req.params.id);
        if (!list) {
            const error = new Error(`No List with ID=${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }
        list.title = req.body.title;
        user = await user.save();
        res.status(200).json({message: "list updated successfully", user: user});
    } catch(err) {
        next(err);
    }
    
}