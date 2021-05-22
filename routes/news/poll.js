//poll routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	vote,
	deletes
}	= require('../../controllers/news/poll.js');


// router.route('/').get(getAll);
// router.route('/:id').get(getSingle);
router.route('/create').post(protect,create);
router.route('/vote').post(protect,vote);
router.route('/delete/:id').post(protect,deletes);
module.exports = router; 