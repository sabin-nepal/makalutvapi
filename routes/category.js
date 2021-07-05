//category routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	getAll,
	getNews,
	deletes,
	getCategories,
}	= require('../controllers/category.js');

router.route('/create').post(protect,create);
router.route('/:type/:limit').get(getAll);
router.route('/all').get(protect,getCategories);
router.route('/news/limit/:limit').get(getNews);
router.route('/edit/:id').post(protect,edit);
router.route('/:id').delete(protect,deletes);

module.exports = router; 