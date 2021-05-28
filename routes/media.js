//video routing
const { Router } = require("express");
const router = Router();

const{
	getAll,
	getMediaById,
}	= require('../controllers/media.js');

router.route('/').get(getAll);
router.route('/:id').get(getMediaById);


module.exports = router; 