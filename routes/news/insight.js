//insight routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
}	= require('../../controllers/news/insight.js');


router.route('/').get(getAll);
// router.route('/:id').get(getSingle);
router.route('/create').post(protect,create);
// router.route('/delete/:id').post(protect,deletes);
module.exports = router; 