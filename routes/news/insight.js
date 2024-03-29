//insight routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	getLimit,
	getSingle,
	edit,
	deletes,
	getInsights,
}	= require('../../controllers/news/insight.js');


router.route('/').get(getInsights);
router.route('/all').get(protect,getAll);
router.route('/limit/:limit').get(getLimit);
router.route('/:id').get(getSingle);
router.route('/create').post(protect,create);
router.route('/edit/:id').post(protect,edit);
router.route('/:id').delete(protect,deletes);
module.exports = router; 