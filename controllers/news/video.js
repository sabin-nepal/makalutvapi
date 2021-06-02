const { Video,Category } = require('../../models/news/Video');
const Media = require('../../models/Media')

exports.create = async (req,res) => {

	const { title,media,category,thumbnail } = req.body

	if(!title || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Title or media cannot be empty.",
		});
	const video =  await Video.create({
		title:title,
		videoId: media,
		thumbnailId: thumbnail,
		userId:req.user.id,

	});
	await video.addCategory(category);
	res.status(201).json({
	  success: true,
	  msg: "Video created successfully.",
	});
}

exports.getAll = async(req,res)=>{

	const video = await Video.findAll({
	  where: {
	    status: 'active',
	  },
	  include:[
	  		{
	  		 model: Media,
	  		 as: 'thumbnail',
	  		 attributes: ['path'],
	  		},
	  		{
	  		 model: Media,
	  		 as: 'media',
	  		 attributes: ['path'],
	  		},	
	  		{
	  		 model: Category,
	  		 attributes: ['id','title'],
	  		},	
	  ],	    	
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(video);

}

exports.edit = async (req,res) => {
	const { title,media,category,thumbnail } = req.body
	const video = await Video.findByPk(req.params.id);
	if(!video)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await video.removeCategory(video.categories)
	video.title = title
	video.videoId = media
	video.thumbnailId = thumbnail
	await video.addCategory(category);
	await video.save();
	res.status(201).json({
	  msg: "Video has been updated successfully.",
	});	
}


exports.deletes = async (req,res) => {

	const video = await Video.findByPk(req.params.id);
	if(!video)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await video.destroy();	
	res.status(201).json({
	  msg: "Video has been deleted successfully.",
	});	

}