//video routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	edit,
	getAll,
	deletes,
}	= require('../../controllers/news/video.js');


router.route('/').get(getAll);
router.route('/create').post(protect,create);
router.route('/edit/:id').post(protect,edit);
router.route('/delete/:id').post(protect,deletes);
module.exports = router; 