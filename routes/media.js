//video routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')
const { media,videoUpload } = require('../helpers/upload.js')
const{
	getAll,
	getMediaById,
	deletes,
}	= require('../controllers/media.js');

const{
	upload,
	uploads,
	
}	= require('../controllers/upload.js');

router.route('/').get(getAll);
router.route('/:id').get(getMediaById);
router.route('/:id').delete(protect,deletes);

//upload

//router.route('/upload').post(protect,imageUpload.single('thumbnail'),upload);
router.route('/upload').post(protect,media.array('media'),upload);


module.exports = router; 