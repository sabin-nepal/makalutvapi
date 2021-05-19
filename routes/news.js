//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	edit,
	deletes
}	= require('../controllers/news/news.js');

router.route('/create').post(protect,create);
router.route('/delete/:id').post(protect,deletes);
module.exports = router; 