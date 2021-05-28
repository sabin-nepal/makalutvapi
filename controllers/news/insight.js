const { Insight,Category } = require('../../models/news/Insight');
const Media = require('../../models/Media')

exports.create = async (req,res) => {

	const { images,category,status} = req.body
	if(!images)
		return res.status(406).json({
		  success: false,
		  msg: "Images Cannot Be Empty",
		});
	const insight =  await Insight.create({
		status:status,
		userId:req.user.id,
	});
	await insight.addMedia(images, { through: { selfGranted: false } });
	await insight.addCategory(category, { through: { selfGranted: false } });
	res.status(201).json({
	  success: true,
	  msg: "Insight created successfully.",
	});
	
}

exports.getAll = async(req,res) => {

	const insight = await Insight.findAll({
	  where: {
	    status: 'active'
	  },
	  include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	 through: {attributes: []}
	  	},
	  ],
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(insight);
}