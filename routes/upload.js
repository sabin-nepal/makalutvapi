//video routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')
const { imageUpload,videoUpload } = require('../helpers/upload.js')

const{
	upload,
	
}	= require('../controllers/upload.js');

router.route('/image').post(protect,imageUpload.single('thumbnail'),upload);
router.route('/video').post(protect,videoUpload.single('video'),upload);

module.exports = router; 