const Media = require('../models/Media');
const { getPagination } = require('../helpers/pagination');
exports.getAll = async(req,res) => {
	const { page, size} = req.query;
  const { limit, offset } = getPagination(page, size);
	const media = await Media.findAndCountAll({
		limit,
		offset,
		order: [
			['createdAt', 'DESC'],
		   ] 
	});
	res.status(200).json(media);
}


exports.deletes = async(req,res) => {
	const media = await Media.findByPk(req.params.id);
	if(!media)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await media.destroy();
	res.status(201).json({
	  success: true,
	  msg: "Media has been deleted successfully.",
	});	
}

exports.getMediaById = async(req,res) => {
	const media = await getThumbnail(req.params.id);
	res.status(200).json(media);
}

var getThumbnail = exports.getThumbnail = async(id) =>{

	const media = await Media.findByPk(id);
	return media.path;
}