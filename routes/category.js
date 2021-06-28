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
}	= require('../controllers/category.js');

router.route('/create').post(protect,create);
router.route('/:type/:limit').get(getAll);
router.route('/news/limit/:limit').get(getNews);
router.route('/edit/:id').post(protect,edit);
router.route('/delete/:id').post(protect,deletes);

module.exports = router; 