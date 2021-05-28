const { Insight,Category } = require('../../models/news/Insight');
const Media = require('../../models/Media')

exports.create = async (req,res) => {

	const { media,category,status} = req.body
	if(!media)
		return res.status(406).json({
		  success: false,
		  msg: "media Cannot Be Empty",
		});
	const insight =  await Insight.create({
		status:status,
		userId:req.user.id,
	});
	await insight.addMedia(media);
	await insight.addCategory(category);
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

exports.getSingle = async(req,res) => {

	const { id } = req.params;
	const insight = await Insight.findByPk(id);
	if(!insight)
		return res.status(204).json();
	res.status(200).json(insight);
}

exports.edit = async (req,res) => {
	const { media,category,status} = req.body
	const insight = await Insight.findByPk(req.params.id,{
			include: [
		    	{
		    	 model: Media,
		    	},
		    	{
		    	 model: Category,
		    	},
		    ]
	});
	if(!insight)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await insight.removeCategory(insight.categories)
	await insight.removeMedia(insight.media)
	insight.status = status
	await insight.addCategory(category);
	await insight.addMedia(media);
	await insight.save();
	res.status(201).json({
	  success: true,
	  msg: "Insight has been updated successfully.",
	});	
}

exports.deletes = async (req,res) => {
	const insight = await Insight.findByPk(req.params.id);
	if(!insight)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await insight.destroy();	
	res.status(201).json({
	  success: true,
	  msg: "News has been deleted successfully.",
	});	

}
