const express = require('express');
const listController = require('../controllers/list');
const validObjectId = require('../middleware/validObjectId');
const isAuth = require('../middleware/isAuth');
const router = express.Router();


// add todo-list
router.post('/' , isAuth, listController.addToList);

// delete from todolist
router.delete('/:id', [isAuth , validObjectId] , listController.removeFromList);

// edit-todo-list
router.put('/:id', [isAuth , validObjectId] , listController.editList);



module.exports = router;