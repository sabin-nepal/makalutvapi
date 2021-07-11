//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	getTypeLimit,
	getdailyNews,
	getSingle,
	edit,
	deletes,
	getCategoryNews,
	vote,
	getVoteResult,
	getSearchResult,
	getNews,
}	= require('../../controllers/news/news.js');


router.route('/').get(getAll);
router.route('/all').get(protect,getNews);
router.route('/daily').get(getdailyNews);
router.route('/type').get(getTypeLimit);
router.route('/:id').get(getSingle);
router.route('/edit/:id').post(protect,edit);
router.route('/create').post(protect,create);
router.route('/:id').delete(protect,deletes);
router.route('/vote/:id').post(vote);
router.route('/vote/:id').get(getVoteResult);
router.route('/category/:id/:limit').get(getCategoryNews);
router.route('/search/:s').get(getSearchResult);
module.exports = router;