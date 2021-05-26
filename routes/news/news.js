//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	getSingle,
	edit,
	deletes,
	getCategoryNews,
}	= require('../../controllers/news/news.js');


router.route('/').get(getAll);
router.route('/:id').get(getSingle);
router.route('/edit/:id').post(protect,edit);
router.route('/create').post(protect,create);
router.route('/delete/:id').post(protect,deletes);
router.route('/category/:id').get(getCategoryNews);
module.exports = router; 