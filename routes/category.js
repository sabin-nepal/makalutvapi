//category routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	deletes,
}	= require('../controllers/category.js');

router.route('/create').post(protect,create);


module.exports = router; 