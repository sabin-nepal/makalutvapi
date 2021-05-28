const Media = require('../models/Media');
exports.getAll = async(req,res) => {
	const media = await Media.findAll();
	res.status(200).json(media);
}

exports.getMediaById = async(req,res) => {
	const media = await getThumbnail(req.params.id);
	res.status(200).json(media);
}

var getThumbnail = exports.getThumbnail = async(id) =>{

	const media = await Media.findByPk(id);
	return media.path;
}