//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	getByType,
	getSingle,
	edit,
	deletes,
	getCategoryNews,
	vote,
	getVoteResult,
}	= require('../../controllers/news/news.js');


router.route('/').get(getAll);
router.route('/type/:type/:limit').get(getByType);
router.route('/:id').get(getSingle);
router.route('/edit/:id').post(protect,edit);
router.route('/create').post(protect,create);
router.route('/delete/:id').post(protect,deletes);
router.route('/vote').post(vote);
router.route('/vote/:id').get(getVoteResult);
router.route('/category/:id').get(getCategoryNews);
module.exports = router; 