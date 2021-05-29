const { Video,Category } = require('../../models/news/Video');
const Media = require('../../models/Media')

exports.create = async (req,res) => {

	const { title,media,category } = req.body

	if(!title || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Title or media cannot be empty.",
		});
	const video =  await Video.create({
		title:title,
		mediumId: media,
		userId:req.user.id,

	});
	await video.addCategory(category);
	res.status(201).json({
	  success: true,
	  msg: "Video created successfully.",
	});
}

exports.getAll = async(req,res)=>{

	const vdeo = await Video.findAll({
	  where: {
	    status: 'active',
	  },
	  include:
	    	{
	    	 model: Media,
	    	 attributes: ['path'],
	    	},
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(vdeo);

}