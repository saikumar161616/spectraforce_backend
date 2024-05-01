/**
 * @constant router express router method to handle routes efficiently
*/
const router = require('express').Router();
const users = require('./modules/user_profiles/user_profiles.routes.js')
const fileUpload = require('./modules/fileUpload/fileUpload.routes.js')


router.use('/users', users);
router.use('/public', fileUpload);


module.exports = router;