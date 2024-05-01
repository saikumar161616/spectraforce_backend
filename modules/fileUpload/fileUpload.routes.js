/**
 * @constant router express router method to handle routes efficiently
 */
const router = require('express').Router();

/**
 * @constant multer file uploader
*/
const multer = require('multer');

/**
 * @constant mkdirp creates the directory
 */
const mkdirp = require('mkdirp');

const path = require('path')


//storage handler
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function(req, file, cb) {
      const fileName =  Date.now() + path.extname(file.originalname)
      cb(null, fileName); // Add timestamp to file name to ensure uniqueness
      req.uploadedFilename = fileName;
    }
  });

//setting a file limit of 5mb
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

/**
 * upload file to public
*/
router.post('/file-upload',  upload.single('file') , (req, res) => {
    res.send({
        status: true,
        fileName : req.uploadedFilename
    })
});


module.exports = router;
