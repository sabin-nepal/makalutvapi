//Advertisement routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../middelwares/protect.js')

const{
	create,
	getAll,
	getByType,
	edit,
	deletes,
	checkAdv,
}	= require('../controllers/adv.js');


router.route('/').get(getAll);
router.route('/type/:type').get(getByType);
router.route('/check/status').get(checkAdv);
router.route('/create').post(protect,create);
router.route('/edit/:id').post(protect,edit);
router.route('/delete/:id').post(protect,deletes);
module.exports = router;