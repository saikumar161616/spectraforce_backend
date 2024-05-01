
/**
 * @constant router express router method to handle routes efficiently
*/
const router = require('express').Router();

/**
 * @constant usersMiddleware middleware to handle user requests before passing to controller
*/
const usersMiddleware = require('./user_profiles.middleware');

/**
 * @constant usersController to perform operation on users module at database
*/
const usersController = require('./user_profiles.controller');

/**
 * create a user route 
*/
router.post('/',
    (req, res, next) => usersMiddleware.prepareSaveRequest(req, res, next),
    (req, res) => usersController.saveUserController(req, res));

/**
 * get all users route 
*/
router.get('/',
    (req, res) => usersController.getAllUsers(req, res));

/**
 * get user uploaded file 
*/
router.get('/file/:uniqueId',
    (req, res) => usersController.getUserUploadedFileController(req, res));


/**
 * get user by id route 
*/
router.get('/:uniqueId',
    (req, res) => usersController.getUserByIdController(req, res));


/**
 * update a user by id route 
*/
router.put('/:uniqueId',
    (req, res, next) => usersMiddleware.prepareUpdateUserRequest(req, res, next),
    (req, res) => usersController.updateUser(req, res));

/**
 * delete a user by id route 
*/
router.delete('/:uniqueId',
    (req, res) => usersController.deleteUserController(req, res));

module.exports = router;