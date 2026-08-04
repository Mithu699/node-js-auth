const express = require('express');
const authMiddleWare = require("../middleware/auth-middle-ware");
const adminMiddleware = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImageController} = require('../controller/image-controller')  
const router = express.Router();
// upload the image 
router.post('/upload',authMiddleWare,adminMiddleware,uploadMiddleware.single('image'),uploadImageController)



// get all the image 



module.exports = router