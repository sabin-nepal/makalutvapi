//poll routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	edit,
	vote,
	deletes
}	= require('../../controllers/news/poll.js');


router.route('/').get(getAll);
router.route('/edit/:id').get(edit);
router.route('/create').post(protect,create);
router.route('/vote').post(protect,vote);
router.route('/delete/:id').post(protect,deletes);
module.exports = router; 