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
router.route('/news').get(getNews);
router.route('/edit/:id').get(edit);
router.route('/delete/:id').get(deletes);

module.exports = router; 