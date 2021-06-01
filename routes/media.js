//video routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')
const{
	getAll,
	getMediaById,
	deletes,
}	= require('../controllers/media.js');

router.route('/').get(getAll);
router.route('/:id').get(getMediaById);
router.route('/delete/:id').post(protect,deletes);


module.exports = router; 