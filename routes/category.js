//category routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	getAll,
	deletes,
}	= require('../controllers/category.js');

router.route('/create').post(protect,create);
router.route('/').get(getAll);


module.exports = router; 