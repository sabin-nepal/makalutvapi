const { Insight,Category } = require('../../models/news/Insight');
const Media = require('../../models/Media')
const { getPagination } = require('../../helpers/pagination');

exports.create = async (req,res) => {

	const { media,category,status,background} = req.body
	if(!media)
		return res.status(406).json({
		  success: false,
		  msg: "media Cannot Be Empty",
		});
	const insight =  await Insight.create({
		status:status,
		backgroundId: background,
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
	  	 as: 'background',
	  	 attributes: ['id','path'],
	  	},
	  	{
	  	 model: Media,
	  	 as: 'media',
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

exports.getInsights = async(req,res) => {
	const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
	const insight = await Insight.findAndCountAll({
		limit,
		offset,
	  include:[
	  	{
	  	 model: Media,
	  	 as: 'background',
	  	 attributes: ['id','path'],
	  	},
	  	{
	  	 model: Media,
	  	 as: 'media',
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

exports.getLimit = async(req,res) => {
	const { limit } = req.params;
	const insight = await Insight.findAll({
		  where: {
		    status: 'active'
		  }, 
		  limit: Number(limit),
		  include:[
		  	{
		  	 model: Media,
		  	 as:'media',
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
	const { media,category,status,background} = req.body
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
	if(!media)
		return res.status(406).json({
			success: false,
			msg: "media Cannot Be Empty",
	});	
	await insight.removeCategory(insight.categories)
	await insight.removeMedia(insight.media)
	insight.status = status
	insight.background = background
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
	  msg: "Insight has been deleted successfully.",
	});	

}
