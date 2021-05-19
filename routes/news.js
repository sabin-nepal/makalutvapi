//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	deletes,
}	= require('../controllers/news/news.js');

router.route('/create').post(protect,create);

module.exports = router; 