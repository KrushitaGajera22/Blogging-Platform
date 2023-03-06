const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAdmin } = require('../middleware/authentication');

//for uploading an image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

//for specific types of file
const fileFilter = (req, file, cb) => {
    if (mimetype === image / png || mimetype === image / jpeg) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

//for file storage and file size limit
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

//adding controller
const blogController = require('../controllers/blog');

// for getting all blogs
router.get('/', blogController.get_blogs)

//for creating new blog
router.post('/', upload.single('blogImage'), isAdmin, blogController.create_blog)

//for finding blog by id
router.get('/:blogId', blogController.blog_get);

//for updating the blogs
router.patch('/:blogId', isAdmin, blogController.update_blog);

//for deleting the blog
router.delete('/:blogId', isAdmin, blogController.delete_blog);

module.exports = router;