//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')
const { imageUpload } = require('../helpers/upload.js')

const{
	create,
	getAll,
	getSingle,
	edit,
	deletes
}	= require('../controllers/news/news.js');


router.route('/').get(getAll);
router.route('/:id').get(getSingle);
router.route('/create').post(protect,imageUpload.single('thumbnail'),create);
router.route('/delete/:id').post(protect,deletes);
module.exports = router; 