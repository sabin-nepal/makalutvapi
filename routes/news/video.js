//video routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
}	= require('../../controllers/news/video.js');


// router.route('/').get(getAll);
// router.route('/:id').get(getSingle);
router.route('/create').post(protect,create);
//router.route('/delete/:id').post(protect,deletes);
module.exports = router; 