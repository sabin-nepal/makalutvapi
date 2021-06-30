//news routing
const { Router } = require("express");
const router = Router();
const { protect } = require('../../middelwares/protect.js')

const{
	create,
	getAll,
	getTypeLimit,
	getType,
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
router.route('/').get(protect,getNews);
router.route('/type/:type').get(getType);
router.route('/type/:type/:limit').get(getTypeLimit);
router.route('/:id').get(getSingle);
router.route('/edit/:id').post(protect,edit);
router.route('/create').post(protect,create);
router.route('/delete/:id').post(protect,deletes);
router.route('/vote/:id').post(vote);
router.route('/vote/:id').get(getVoteResult);
router.route('/category/:id/:limit').get(getCategoryNews);
router.route('/search/:s').get(getSearchResult);
module.exports = router;