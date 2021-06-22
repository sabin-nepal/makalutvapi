//category routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	getAll,
	getAllNews,
	deletes,
}	= require('../controllers/category.js');

router.route('/create').post(protect,create);
router.route('/:type').get(getAll);
router.route('/news').get(getAllNews);


module.exports = router; 